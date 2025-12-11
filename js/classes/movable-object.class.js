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

  /**
   * Models gravity acceleration on objects.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY < 0) {
        this.y = this.y + this.speedY;
        this.speedY = this.speedY + this.gravityAcceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks whether an object is above ground.
   * @returns boolean
   */
  isAboveGround() {
    return this.y + this.height - this.offset.bottom < groundLevel;
  }

  /**
   * Models right movement of an object.
   */
  moveRight() {
    this.x += this.v;
    if (this instanceof Character) this.updateLatestActivityMs();
  }

  /**
   * Models left movement of an object.
   */
  moveLeft() {
    this.x -= this.v;
    if (this instanceof Character) this.updateLatestActivityMs();
  }

  /**
   * Models Jumping of character.
   */
  jump() {
    this.speedY = -25;
    if (this instanceof Character) this.updateLatestActivityMs();
  }

  /**
   * Loads next image of selecte image array into image chache.
   * @param {array} imgsArray
   */
  playAnimation(imgsArray) {
    this.currentImgIndx = this.currentImgIndx % imgsArray.length;
    let path = imgsArray[this.currentImgIndx];
    this.img = this.imgsCache[path];
    this.currentImgIndx++;
  }

  /**
   * Checks whether movable object is colliding with a second object.
   * @param {object} obj
   * @returns boolean
   */
  isColliding(obj) {
    const thisLeft = this.x + this.offset.left;
    const thisRight = this.x + this.width - this.offset.right;
    const thisTop = this.y + this.offset.top;
    const thisBottom = this.y + this.height - this.offset.bottom;

    const objLeft = obj.x + obj.offset.left;
    const objRight = obj.x + obj.width - obj.offset.right;
    const objTop = obj.y + obj.offset.top;
    const objBottom = obj.y + obj.height - obj.offset.bottom;
    return (
      thisRight >= objLeft &&
      thisLeft <= objRight &&
      thisBottom >= objTop &&
      thisTop <= objBottom
    );
  }

  /**
   * Checks whether object is dead.
   * @returns boolean
   */
  isDead() {
    return this.energy <= 0;
  }

  /**
   * Models hit process of objects.
   */
  hit() {
    if (this instanceof Character) {
      if (this.finishedHitCooldown()) this.processCharacterHit();
    } else if (this instanceof Endboss) {
      this.processEndbossHit();
    } else {
      this.processChickenHit();
    }
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  /**
   * Models hurt of object if latest hit is 1 second ago or longer.
   * @returns booelan
   */
  isHurt() {
    let passedTimeMs = new Date().getTime() - this.latestHit;
    let passedTimeS = passedTimeMs / 1000;
    return passedTimeS < 1;
  }

  /**
   * Processes character hit
   */
  processCharacterHit() {
    if (this.world.endboss.touchesCharacter()) {
      this.processCharacterDamage(-30);
    } else {
      this.processCharacterDamage(-10);
    }
  }

  /**
   * Processes character damage.
   */
  processCharacterDamage(damage) {
    let statusBar;
    this.energy -= 10;
    this.latestHit = new Date().getTime();
    statusBar = this.world.statusbars[0];
    statusBar.percentageHealth = this.energy;
    statusBar.setImgByStatusValue("health", this.energy);
  }

  /**
   * Processes endboss hit.
   */
  processEndbossHit() {
    let statusBar;
    this.energy -= 10;
    statusBar = this.world.statusbars[3];
    statusBar.percentageHealth = this.energy;
    statusBar.setImgByStatusValue("endboss", this.energy);
    this.latestHit = new Date().getTime();
  }

  /**
   * Processes chicken hit.
   */
  processChickenHit() {
    this.energy -= 100;
    this.latestAlive = new Date().getTime();
  }
}
