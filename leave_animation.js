onmousemove = (event) => {
    var eventDoc, doc, body;

    event = event || window.event;
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop || body && body.scrollTop || 0) -
            (doc && doc.clientTop || body && body.clientTop || 0);
    }
    mouseX = event.pageX;
    mouseY = event.pageY;
}

const frame = document.getElementById("leave-frame");
const fallingSpeed = 1;
const lowerBound = window.innerHeight * 0.67;
var mouseX = 0;
var lastMouseX = 0;
var mouseY = 0;
var lastMouseY = 0;
var leaves = [];


function spawnLeaveAtPos() {
    if (lastMouseX == mouseX || lastMouseY == mouseY || mouseY >= lowerBound)
        return;
    const leave = document.createElement("div");
    leave.classList.add("leave");
    leave.style.top = `${mouseY}px`;
    leave.style.left = `${mouseX}px`;
    frame.appendChild(leave);
    leaves.push(leave);
    lastMouseX = mouseX;
    lastMouseY = mouseY;
}

function updateLeavePositions() {
    leaves.forEach((val) => {
        const oldPos = val.style.top.split('px')[0];
        const newPos = oldPos - 1 * -1 * fallingSpeed;

        if (newPos <= lowerBound) {
            val.style.top = `${(newPos)}px`;
            return;
        }
        setTimeout(removeLeave, 1000, val);
    });
}

function removeLeave(leave) {
    leaves = removeItemOnce(leaves, leave);
    leave.remove();
}

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

setInterval(spawnLeaveAtPos, 200);
setInterval(updateLeavePositions, 10);