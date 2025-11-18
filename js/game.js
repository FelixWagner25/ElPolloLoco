let canvas;
let ctx;
let world;
let canvasHeightPx = 480;
let keyboard = new Keyboard();
let gameStatus = "notStarted";
let animationIntervals = [];

function init() {
  canvas = document.getElementById("canvas");
  if (gameStatus !== "open") {
    gameStatus = "open";
    canvas.style.backgroundImage =
      "url('./img/img_pollo_locco/5_background/layers/air.png')";
    canvas.style.cursor = "default";
    initLevel();
    world = new World(canvas, keyboard);
  }
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
      break;
    case "d":
      keyboard.d = true;
      break;
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
      break;
    case "d":
      keyboard.d = false;
      break;
  }
});

document.getElementById("btn-left").addEventListener("touchstart", (event) => {
  keyboard.left = true;
});

document.getElementById("btn-left").addEventListener("touchend", (event) => {
  keyboard.left = false;
});
