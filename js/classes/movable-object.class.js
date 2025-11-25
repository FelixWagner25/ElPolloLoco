class MovableObject extends DrawableObject {
  v;
  dt = 17;
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
  latestAlive;

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
    return this.y + this.height - this.offset.bottom < groundLevel;
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
    let statusBar;
    if (this instanceof Character) {
      this.energy -= 10;
      statusBar = this.world.statusbars[0];
      statusBar.percentageHealth = this.energy;
      statusBar.setImgByStatusValue("health", this.energy);
    } else if (this instanceof Endboss) {
      this.energy -= 10;
      statusBar = this.world.statusbars[3];
      statusBar.percentageHealth = this.energy;
      statusBar.setImgByStatusValue("endboss", this.energy);
    } else {
      this.energy -= 100;
      this.latestAlive = new Date().getTime();
    }

    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.latestHit = new Date().getTime();
    }
  }

  isHurt() {
    let passedTimeMs = new Date().getTime() - this.latestHit;
    let passedTimeS = passedTimeMs / 1000;
    return passedTimeS < 1;
  }
}
