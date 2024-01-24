const canvas = document.querySelector("canvas");
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
let connectButton = document.querySelector("#connectButton");
let hostnameInput = document.querySelector("#hostname");
function reconnectClient() {
    window.api.startClient(hostnameInput.value);
}
// Robot's current position according to Copper Console
// -1 is a sentinel value indicating that it hasn't been updated yet.
const robotPos = {
    x: -1,
    y: -1,
    rotation: 0,
};
// Element to display robot position
const posDisplay = document.querySelector("p#posDisplay");
// 26ft 11 1/4 in field -> meters
// Dimensional analysis to calculate pixels per meter
// (1 field / 26ft 11 1/4in) * (3.28084 ft / 1 meter) * (canvas width pixels / 1 field) = (FIELD_SCALE pixels / 1 meter)
// (the 1/26 number is moved to the end of the expression for ease of reading)
const FIELD_SCALE = (3.28084 * canvas.width) / (26 + 12 + 11 + 0.25);
/** Convert a position in meters on the field into screen coords in pixels */
function fieldToScreenCoords(x, y) {
    // Scale from pixels to meters
    const scaledX = fieldToScreenDistance(x);
    const scaledY = fieldToScreenDistance(y);
    // Invert Y position
    const finalX = scaledX;
    const finalY = canvas.height - scaledY;
    return [finalX, finalY];
}
//** Convert a number from meters to pixels */
function fieldToScreenDistance(d) {
    console.log(FIELD_SCALE);
    return d * FIELD_SCALE;
}
function render() {
    posDisplay.innerHTML = `{x: ${robotPos.x}, y: ${robotPos.y}}`;
    drawField();
    ctx.fillStyle = "red";
    const [screenX, screenY] = fieldToScreenCoords(robotPos.x, robotPos.y);
    ctx.translate(screenX, screenY);
    ctx.rotate(robotPos.rotation);
    // 30 inches to meters = 0.762
    const screenSize = fieldToScreenDistance(0.762);
    ctx.fillRect(
    // Offset by 1/2 of robot width for centered position
    screenX + screenSize / 2, 
    // Offset by 1/2 of robot width for centered position
    screenY + screenSize / 2, screenSize, screenSize);
    // Reset transformation matrix to the identity matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}
window.api.receive("x", (arg) => {
    robotPos.x = arg;
    render();
});
window.api.receive("y", (arg) => {
    robotPos.y = arg;
    render();
});
window.api.receive("rotation", (arg) => {
    robotPos.rotation = arg;
    render();
});
/** Generate a subscribe function for a subscription */
function subscribeFunction(subscription) {
    return (subscriber) => {
        subscription.subscribers.push(subscriber);
    };
}
/** Generate a setter function for a subscription */
function setFunction(container) {
    return (newValue) => {
        container.value = newValue;
        for (let subscriber of container.subscribers) {
            subscriber(container.value);
        }
    };
}
function useSubscription(defaultValue) {
    const subscription = {
        subscribers: [],
        value: defaultValue,
        subscribe: null,
        set: null,
    };
    subscription.subscribe = subscribeFunction(subscription);
    subscription.set = setFunction(subscription);
    return subscription;
}
const stateSubscription = useSubscription({
    isConnected: false,
    err: null,
});
window.api.receive("clientStarted", (state) => {
    stateSubscription.set(state);
});
// Warning element
let warningElement = document.querySelector("#warning");
stateSubscription.subscribe((newValue) => {
    if (!newValue.isConnected) {
        warningElement.innerText = "Warning: not connected!";
    }
    else {
        warningElement.innerText = "Connected";
    }
});
stateSubscription.subscribe((newValue) => {
    console.log("State updated", newValue);
});
//# sourceMappingURL=renderer.js.map