let canvas;
let ctx;
let world;
let canvasHeightPx = 480;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);

  console.log("My character is", world.character);
}
