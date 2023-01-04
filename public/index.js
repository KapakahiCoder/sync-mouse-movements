import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const db = getDatabase();

const coordsListRef = ref(db, "mouse/position");

// Get the current mouse position
document.addEventListener("mousemove", (event) => {
  let x = event.clientX;
  let y = event.clientY;
  let xyCoords = { x, y };

  // Record mouse movements in the DB
  const newCordsRef = push(coordsListRef);
  set(newCordsRef, { coords: xyCoords });
});

// Create virtual pointer
const pointer = document.createElement("div");
pointer.classList.add("pointer");
document.body.appendChild(pointer);

// Retrieve mouse coordinates from the DB and have virtual pointer follow those movements
let coordsArray = [];
let x;
let y;
let coordsObj = {};
onValue(coordsListRef, (snapshot) => {
  snapshot.forEach((child) => {
    x = child.val().coords.x;
    y = child.val().coords.y;
    coordsObj = { x, y };
    coordsArray.push(coordsObj); // TODO: refactor to make more efficient
  });

  let newX = coordsArray[coordsArray.length - 1].x;
  let newY = coordsArray[coordsArray.length - 1].y;
  pointer.style.left = newX + "px";
  pointer.style.top = newY + "px";
});
