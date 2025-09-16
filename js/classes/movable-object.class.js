class MovableObject {
  height = 150;
  width = 100;
  x = 40;
  y = canvasHeightPx - this.height;
  img;
  imgsCache = {};

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgsCache[path] = img;
    });
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {}
}
