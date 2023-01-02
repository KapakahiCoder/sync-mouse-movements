import {
  getDatabase,
  ref,
  set,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const db = getDatabase();

const coordsListRef = ref(db, "mouse/position");

// Get the current mouse position
document.addEventListener("mousemove", (event) => {
  let x = event.clientX;
  let y = event.clientY;
  let xyCoords = { x, y };
  console.log(xyCoords);

  const newCordsRef = push(coordsListRef);
  set(newCordsRef, { coords: xyCoords });
});
