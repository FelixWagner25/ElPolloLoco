class MovableObject extends DrawableObject {
  v;
  dt = 17; // time step for image change in MilliSeconds
  otherDirection = false;
  speedY = 0;
  gravityAcceleration = 2.5;
  energy = 100;
  latestHit = 0;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  constructor() {
    super();
  }

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
    this.world.statusbars[0].percentageHealth = this.energy;
    this.world.statusbars[0].setImgByPercentage("health", this.energy);
    if (this.energy < 0) {
      this.energy = 0;
      this.world.statusbars[0].percentage = 0;
    } else {
      this.latestHit = new Date().getTime();

      console.log("percentage", this.world.statusbars[0].percentage);
    }
  }

  isHurt() {
    let passedTimeMs = new Date().getTime() - this.latestHit;
    let passedTimeS = passedTimeMs / 1000;
    return passedTimeS < 1;
  }
}
