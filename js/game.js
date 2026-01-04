let canvas;
let ctx;
let world;
let canvasHeightPx = 480;
let keyboard = new Keyboard();
let gameStatus = "notStarted";
let gameMuted = getMuteSettingValue();
let animationIntervals = [];
let terminationSoundPlayed = false;
let allowSoundsBtnRef = document.getElementById("allow-sounds-btn");
let bgDimmedRef = document.getElementById("bg-dimmed");

/**
 * Initializes Pollo Loco Game. Creates World.
 */
function init() {
  canvas = document.getElementById("canvas");
  hideStartEndScreens();
  initializeAllSounds();
  if (gameStatus !== "open") {
    gameStatus = "open";
    terminationSoundPlayed = false;
    canvas.style.backgroundImage =
      "url('./img/img_pollo_locco/5_background/layers/air.png')";
    //if (!gameMuted) backgroundMusic.play();
    initLevel();
    world = new World(canvas, keyboard);
  }
}

/**
 * Restarts game
 */
function restartGame() {
  stopGame();
  gameStatus = "notStarted";
  init();
}

/**
 * Returns to home screen after game finished
 */
function returnToHome() {
  stopGame();
  gameStatus = "notStarted";
  hideStartEndScreens();
  showHomeScreen();
}

/**
 * Stops finished game
 */
function stopGame() {
  gameStatus = "closing";
  stopAllSounds();
  animationIntervals.forEach((id) => clearInterval(id));
  animationIntervals = [];
  world.stopActions();
}

/**
 * Hide all Screen Wallpapers on Canvas
 */
function hideStartEndScreens() {
  let screenRefs = document.getElementsByClassName("game-screen");
  for (let ref = 0; ref < screenRefs.length; ref++) {
    screenRefs[ref].style.display = "none";
  }
}

/**
 * Shows endsceens on canvas
 * @param {string} elementId - endscreen html element id
 */
function showEndScreen(elementId) {
  hideStartEndScreens();
  let elementRef = document.getElementById(elementId);
  elementRef.style.display = "flex";
}

/**
 * Shows home screen
 */
function showHomeScreen() {
  let elementRef = document.getElementById("start-screen");
  elementRef.style.display = "block";
}

function processMuteSetting() {
  gameMuted = getMuteSettingValue();
  showMuteButton(gameMuted);
  if (gameMuted == false) {
    showAllowSoundBtn();
  }
}

function showAllowSoundBtn() {
  bgDimmedRef.style.display = "block";
  bgDimmedRef.style.pointerEvents = "none";
  allowSoundsBtnRef.display = "flex";
}

function allowSounds() {
  hideAllowSoundsBtn();
  backgroundMusic.play();
}

function hideAllowSoundsBtn() {
  bgDimmedRef.style.display = "none";
  bgDimmedRef.style.pointerEvents = "all";
}

/**
 * Toggles sounds of the game.
 */
function toggleMute() {
  if (gameMuted) {
    gameMuted = false;
    saveToLocalStorage("gameMuted", gameMuted);
    showMuteButton(gameMuted);
    backgroundMusic.play();
  } else {
    gameMuted = true;
    saveToLocalStorage("gameMuted", gameMuted);
    showMuteButton(gameMuted);
    backgroundMusic.pause();
  }
}

/**
 * Shows correct background icon of mute button
 * @param {boolean} gameMuted
 */
function showMuteButton(gameMuted) {
  if (gameMuted) {
    document.getElementById("btn-mute").style.backgroundImage =
      "url('./icons/volume_off.svg')";
  } else {
    document.getElementById("btn-mute").style.backgroundImage =
      "url('./icons/volume_up.svg')";
  }
}

/**
 * Gets local mute setting value
 * @returns boolean
 */
function getMuteSettingValue() {
  let localStorageValue = getFromLocalStorage("gameMuted");
  if (localStorageValue == null) return true;
  return localStorageValue;
}

/**
 * Gets value of key from local storage
 * @param {string} key
 * @returns value
 */
function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

/**
 * Saves key value pair to local storage
 * @param {string} key
 * @param {value} value
 */
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Checks whether as certain event has passed for mentioned time in miliseconds
 * @param {integer} timeEvent
 * @param {integer} timeMs
 * @returns boolean
 */
function timePassedMsSinceEvent(timeEvent, timeMs) {
  let currentTime = new Date().getTime();
  return currentTime - timeEvent > timeMs;
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

document.getElementById("btn-left").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.left = true;
});

document.getElementById("btn-right").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.right = true;
});

document.getElementById("btn-up").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.up = true;
});

document.getElementById("btn-throw").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.d = true;
});

document.getElementById("btn-left").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.left = false;
});

document.getElementById("btn-right").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.right = false;
});

document.getElementById("btn-up").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.up = false;
});

document.getElementById("btn-throw").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.d = false;
});

document.getElementById("btn-mute").addEventListener("click", (e) => {
  e.preventDefault();
  toggleMute();
});
