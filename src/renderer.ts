const canvas: HTMLCanvasElement = document.querySelector(
  "canvas"
) as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

// Field rendering

let field = new Image();
field.src = "field.png";
function drawField() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 900, 900);
  ctx.drawImage(field, 0, 0, canvas.width, canvas.height);
}
field.onload = function () {
  render();
};

// Connection form

let connectButton: HTMLButtonElement = document.querySelector("#connectButton");
let hostnameInput: HTMLInputElement = document.querySelector("#hostname");
function reconnectClient() {
  window.api.startClient(hostnameInput.value);
}

// Robot's current position according to Copper Console
// -1 is a sentinel value indicating that it hasn't been updated yet.
const robotPos = {
  x: -1,
  y: -1,
};

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
  console.log(FIELD_SCALE);
  return d * FIELD_SCALE;
}

function render() {
  posDisplay.innerHTML = `{x: ${robotPos.x}, y: ${robotPos.y}}`;
  drawField();

  ctx.fillStyle = "red";
  const [screenX, screenY] = fieldToScreenCoords(robotPos.x, robotPos.y);

  // 30 inches to meters = 0.762
  const screenSize = fieldToScreenDistance(0.762);
  ctx.fillRect(
    // Offset by 1/2 of robot width for centered position
    screenX - screenSize / 2,
    // Offset by 1/2 of robot width for centered position
    screenY - screenSize / 2,
    screenSize,
    screenSize
  );
}

window.api.receive("x", (arg) => {
  robotPos.x = arg;
  render();
});

window.api.receive("y", (arg) => {
  robotPos.y = arg;
  render();
});

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
    for (let subscriber of container.subscribers) {
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

window.api.receive("clientStarted", (state: State) => {
  stateSubscription.set(state);
});

// Warning element

let warningElement: HTMLParagraphElement = document.querySelector(
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
