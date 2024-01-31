import { NT4_Client, NT4_Topic } from "./nt4/NT4";

const canvas: HTMLCanvasElement = document.querySelector(
  "canvas"
) as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// Field rendering

const field = new Image();
import imgUrl from "../field.png";
field.src = imgUrl;
function drawField() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 900, 900);
  ctx.drawImage(field, 0, 0, canvas.width, canvas.height);
}
field.onload = function () {
  render();
};

// Robot's current position according to Copper Console
// -1 is a sentinel value indicating that it hasn't been updated yet.
type Pose2D = {
  x: number;
  y: number;
  rotation: number;
};
let robotPose: Pose2D = {
  x: -1,
  y: -1,
  rotation: -1,
};

type Position = {
  x: number;
  y: number;
};

type Note = {
  pos: Position;
  timestamp: number;
};

const NOTE_RENDER_LIFETIME = 5;

let notes: Note[] = [];

// Keep track of timestamp whenever we receive data from network tables
let currentTimestamp = -1;

/** Update the pose */
function setPose(newPose: Pose2D) {
  robotPose = newPose;
}

// Element to display robot position
const posDisplay = document.querySelector("p#posDisplay");

// 26ft 11 1/4 in field -> meters
// Dimensional analysis to calculate pixels per meter
// (1 field / 26ft 11 1/4in) * (3.28084 ft / 1 meter) * (canvas width pixels / 1 field) = (FIELD_SCALE pixels / 1 meter)
// (the 1/26 number is moved to the end of the expression for ease of reading)
const FIELD_SCALE = (3.28084 * canvas.width) / (26 + 12 + 11 + 0.25);

/** Convert a position in meters on the field into screen coords in pixels */
function fieldToScreenCoords(x: number, y: number): [number, number] {
  // Scale from pixels to meters
  const scaledX = fieldToScreenDistance(x);
  const scaledY = fieldToScreenDistance(y);
  // Invert Y position
  const finalX = scaledX;
  const finalY = canvas.height - scaledY;
  return [finalX, finalY];
}

//** Convert a number from meters to pixels */
function fieldToScreenDistance(d: number): number {
  return d * FIELD_SCALE;
}

function render() {
  posDisplay.innerHTML = `{x: ${robotPose.x}, y: ${robotPose.y}, rot: ${robotPose.rotation}}`;
  drawField();

  ctx.fillStyle = "red";
  const [screenX, screenY] = fieldToScreenCoords(robotPose.x, robotPose.y);
  ctx.translate(screenX, screenY);
  ctx.rotate(robotPose.rotation);
  // 30 inches to meters = 0.762
  const screenSize = fieldToScreenDistance(0.762);
  ctx.fillRect(
    // Offset by 1/2 of robot width for centered position
    -(screenSize / 2),
    // Offset by 1/2 of robot width for centered position
    -(screenSize / 2),
    screenSize,
    screenSize
  );

  // Reset transformation matrix to the identity matrix
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  for (let note of notes) {
    const noteAge = currentTimestamp - note.timestamp;
    // Calculate an opacity from 0-1 which will fade out linearly as the note ages
    // Use max to make sure it's at least 0
    const noteOpacity = Math.max(
      0,
      (NOTE_RENDER_LIFETIME - noteAge) / NOTE_RENDER_LIFETIME
    );
    ctx.globalAlpha = noteOpacity;
    ctx.fillStyle = "orange";
    ctx.fillRect(note.pos.x, note.pos.y, note.pos.x + 50, note.pos.y + 50);
    ctx.globalAlpha = 1;
  }

  notes = notes.filter(
    (value: Note) => value.timestamp - currentTimestamp <= NOTE_RENDER_LIFETIME
  );

  updateNotesListElement();

  requestAnimationFrame(render);
}

// Publisher-subscriber implementation

type Subscriber<T> = (newValue: T) => void;

type Subscription<T> = {
  subscribers: Subscriber<T>[];
  value: T;
  subscribe: (subscriber: Subscriber<T>) => void;
  set: (newValue: T) => void;
};

/** Generate a subscribe function for a subscription */
function subscribeFunction<T>(
  subscription: Subscription<T>
): (subscriber: Subscriber<T>) => void {
  return (subscriber: Subscriber<T>) => {
    subscription.subscribers.push(subscriber);
  };
}

/** Generate a setter function for a subscription */
function setFunction<T>(container: Subscription<T>): (newValue: T) => void {
  return (newValue: T) => {
    container.value = newValue;
    for (const subscriber of container.subscribers) {
      subscriber(container.value);
    }
  };
}

function useSubscription<T>(defaultValue: T): Subscription<T> {
  const subscription: Subscription<T> = {
    subscribers: [],
    value: defaultValue,
    subscribe: null,
    set: null,
  };

  subscription.subscribe = subscribeFunction<T>(subscription);
  subscription.set = setFunction<T>(subscription);

  return subscription;
}

// State subscription

type State = {
  isConnected: boolean;
  err: any;
};

const stateSubscription: Subscription<State> = useSubscription<State>({
  isConnected: false,
  err: null,
});

// Warning element

const warningElement: HTMLParagraphElement = document.querySelector(
  "#warning"
) as HTMLParagraphElement;

stateSubscription.subscribe((newValue: State) => {
  if (!newValue.isConnected) {
    warningElement.innerText = "Warning: not connected!";
  } else {
    warningElement.innerText = "Connected";
  }
});

stateSubscription.subscribe((newValue: State) => {
  console.log("State updated", newValue);
});

// Notes list element
const notesListElement: HTMLParagraphElement = document.querySelector(
  "#notesList"
) as HTMLParagraphElement;

/** Update the content of the notes list element based on the current list of notes */
function updateNotesListElement() {
  let string = "";
  for (let note of notes) {
    string += "{ x:";
    string += note.pos.x.toString();
    string += ", y:";
    string += note.pos.y.toString();
    string += ", timestamp: ";
    string += note.timestamp.toString();
    string += "},";
  }
  notesListElement.innerText = string;
}

// Network tables

const localhostAddress = "127.0.0.1";

let ntClient: NT4_Client | null = null;
let dataSub: number = -1;

function connectClient(hostname: string) {
  ntClient?.unsubscribe(dataSub);
  ntClient?.disconnect();
  stateSubscription.set({ isConnected: false, err: null });
  ntClient = new NT4_Client(
    hostname,
    "CopperConsole",
    (topic: NT4_Topic) => {
      console.log("Topic announced", topic);
    },
    (topic: NT4_Topic) => {
      console.log("Topic unannounced", topic);
    },
    (topic: NT4_Topic, timestamp_us: number, value: unknown) => {
      currentTimestamp = timestamp_us;
      switch (topic.name) {
        case "/CopperConsole/robotPose":
          if (Array.isArray(value) && typeof value[0] === "number") {
            setPose({
              x: value[0],
              y: value[1],
              rotation: value[2],
            });
          }
          break;
        case "/CopperConsole/notes":
          if (
            Array.isArray(value) && // Assert value is an array
            typeof value[0] == "number" && // Assert value is an array of numbers
            value.length !== 0 && // Assert value has at least one item
            value.length % 2 == 0 // Assert value is in pairs
          ) {
            for (let i = 0; i < value.length; i += 2) {
              notes.push({
                pos: {
                  x: value[i],
                  y: value[i + 1],
                },
                timestamp: timestamp_us,
              });
            }
          } else {
            console.log("[WARN] Oddly invalid notes data received: ", value);
          }
          break;
        default:
          break;
      }
      if (topic.name == "/CopperConsole/robotPose") {
        console.log(timestamp_us, "New data", topic, value);
      }
    },
    () => {
      console.log("We do be connected!");
      stateSubscription.set({ isConnected: true, err: null });
    },
    () => {
      console.log("Disconnected");
      stateSubscription.set({ isConnected: false, err: null });
    }
  );
  ntClient.connect();
  dataSub = ntClient.subscribe(
    ["/CopperConsole/robotPose", "/CopperConsole/notes"],
    false
  );
}

// Connection form

const connectButton: HTMLButtonElement =
  document.querySelector("#connectButton");
const hostnameInput: HTMLInputElement = document.querySelector("#hostname");
connectButton.onclick = reconnectClient;

function reconnectClient() {
  console.log(hostnameInput.value);
  connectClient(hostnameInput.value);
}
const connectLocalhostButton: HTMLButtonElement = document.querySelector(
  "#connectLocalhostButton"
);
connectLocalhostButton.onclick = connectLocalhost;
function connectLocalhost() {
  connectClient(localhostAddress);
}
