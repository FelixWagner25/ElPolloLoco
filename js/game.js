let canvas;
let ctx;
let world;
let canvasHeightPx = 480;
let keyboard = new Keyboard();
let gameStatus = "notStarted";
let gameMuted = true;
let animationIntervals = [];

/**
 * Initializes Pollo Loco Game. Creates World.
 */
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

/**
 * Toggles sounds of the game.
 */
function toggleMute() {
  if (gameMuted) {
    gameMuted = false;
    document.getElementById("btn-mute").style.backgroundImage =
      "url('./icons/volume_up.svg')";
  } else {
    gameMuted = true;
    document.getElementById("btn-mute").style.backgroundImage =
      "url('./icons/volume_off.svg')";
  }
}

window.addEventListener("keydown", (event) => {
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

document.getElementById("btn-left").addEventListener("touchstart", () => {
  keyboard.left = true;
});

document.getElementById("btn-right").addEventListener("touchstart", () => {
  keyboard.right = true;
});

document.getElementById("btn-up").addEventListener("touchstart", () => {
  keyboard.up = true;
});
document.getElementById("btn-throw").addEventListener("touchstart", () => {
  keyboard.d = true;
});

document.getElementById("btn-left").addEventListener("touchend", () => {
  keyboard.left = false;
});

document.getElementById("btn-right").addEventListener("touchend", () => {
  keyboard.right = false;
});

document.getElementById("btn-up").addEventListener("touchend", () => {
  keyboard.up = false;
});

document.getElementById("btn-throw").addEventListener("touchend", () => {
  keyboard.d = false;
});

document.getElementById("btn-mute").addEventListener("click", () => {
  toggleMute();
});
