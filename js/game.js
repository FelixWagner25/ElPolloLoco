let canvas;
let ctx;
let world;
let canvasHeightPx = 480;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (event) => {
  //Object.keys(keyboard).forEach((key) => (keyboard[key] = false));
  switch (event.key) {
    case "ArrowUp":
      keyboard.up = true;
      break;
    case "ArrowDown":
      keyboard.down = true;
      break;
    case "ArrowRight":
      keyboard.right = true;
      break;
    case "ArrowLeft":
      keyboard.left = true;
      break;
    case " ":
      keyboard.space = true;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowUp":
      keyboard.up = false;
      break;
    case "ArrowDown":
      keyboard.down = false;
      break;
    case "ArrowRight":
      keyboard.right = false;
      break;
    case "ArrowLeft":
      keyboard.left = false;
      break;
    case " ":
      keyboard.space = false;
  }
});
