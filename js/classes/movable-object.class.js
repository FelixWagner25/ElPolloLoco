class MovableObject {
  height = 150;
  width = 100;
  x = 40;
  y = canvasHeightPx - this.height;
  img;
  imgsCache = {};
  v;
  dt = 17; // time step for image change in MilliSeconds
  otherDirection = false;
  currentImgIndx = 0;

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

  moveLeft() {
    setInterval(() => {
      this.x = this.x - this.v;
    }, this.dt);
  }

  animateWalking() {
    this.currentImgIndx = this.currentImgIndx % this.imgsWalking.length;
    let path = this.imgsWalking[this.currentImgIndx];
    this.img = this.imgsCache[path];
    this.currentImgIndx++;
  }
}
