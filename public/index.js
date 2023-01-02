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
  console.log(xyCoords);

  // Record mouse movements in the DB
  const newCordsRef = push(coordsListRef);
  set(newCordsRef, { coords: xyCoords });
});

let coordsArray = [];
let x;
let y;
let coordsObj = {};
onValue(coordsListRef, (snapshot) => {
  snapshot.forEach((child) => {
    x = child.val().coords.x;
    y = child.val().coords.y;
    coordsObj = { x, y };
    coordsArray.push(coordsObj);
  });

  let newX = coordsArray[coordsArray.length - 1].x;
  let newY = coordsArray[coordsArray.length - 1].y;
  console.log(newX, newY, "xyxyxyxyxyx");
  pointer.style.left = newX + "px";
  pointer.style.top = newY + "px";
});

const pointer = document.createElement("div");
pointer.classList.add("pointer");
document.body.appendChild(pointer);
