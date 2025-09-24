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
  speedY = 0;
  gravityAcceleration = 2.5;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY < 0) {
        this.y = this.y + this.speedY;
        this.speedY = this.speedY + this.gravityAcceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 212.5;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.lineWidth = "5";
      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgsCache[path] = img;
    });
  }

  moveRight() {
    this.x += this.v;
  }

  moveLeft() {
    this.x -= this.v;
  }

  jump() {
    this.speedY = -25;
  }

  playAnimation(imgsArray) {
    this.currentImgIndx = this.currentImgIndx % imgsArray.length;
    let path = imgsArray[this.currentImgIndx];
    this.img = this.imgsCache[path];
    this.currentImgIndx++;
  }
}
