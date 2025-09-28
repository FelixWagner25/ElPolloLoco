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
  energy = 100;
  isHurt = false;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

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

  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
      this.y + this.height - this.offset.bottom > obj.y - obj.offset.top &&
      this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
    );
  }

  isDead() {
    return this.energy <= 0;
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    }
    this.isHurt = true;
    console.log(this.isHurt);

    setInterval(() => {
      this.isHurt = false;
    }, 100);
  }
}
