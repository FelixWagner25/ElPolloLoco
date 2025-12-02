class Bottle extends CollectableObject {
  y = 380;
  width = 50;
  height = 60;
  speedX = 40;
  speedY = -15;
  offset = {
    top: 7,
    bottom: 6,
    left: 20,
    right: 40,
  };
  world;
  isBroken = false;
  latestIntact;

  imgsRotating = [
    "img/img_pollo_locco/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/img_pollo_locco/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/img_pollo_locco/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/img_pollo_locco/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  imgsSplashing = [
    "img/img_pollo_locco/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/img_pollo_locco/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/img_pollo_locco/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/img_pollo_locco/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/img_pollo_locco/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/img_pollo_locco/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * @constructor
   * @param {Integer} sectionNumber - background section where bottle is placed initially.
   */
  constructor(sectionNumber) {
    super();
    this.x =
      200 + Math.random() * sectionLengthPx + sectionNumber * sectionLengthPx;
    let randomInt = Math.round(Math.random());
    this.loadImage(
      `img/img_pollo_locco/6_salsa_bottle/${
        randomInt + 1
      }_salsa_bottle_on_ground.png`
    );
    this.loadImages(this.imgsRotating);
    this.loadImages(this.imgsSplashing);
  }

  /**
   * Throws bottle
   * @param {Integer} x - starting x-coordinate of bottle trajectory
   * @param {Integer} y - starting y-coordinate of bottle trajectory
   */
  throw(x, y) {
    this.x = x;
    this.y = y;
    if (!this.isBroken) {
      this.modelBottleTrajectory();
      this.world.character.latestThrow = new Date().getTime();
      this.applyGravity();
    }
  }

  /**
   * Models bottle trajectory during bottle throw
   */
  modelBottleTrajectory() {
    let thorwInterval = setInterval(() => {
      this.x += this.speedX;
      this.playAnimation(this.imgsRotating);
      this.world.level.enemies.forEach((enemy) => {
        if (this.isColliding(enemy)) {
          this.bottleHitsEnemy(enemy);
          clearInterval(thorwInterval);
        }
      });
      if (!this.isAboveGround()) {
        this.bottleHitsGround();
        clearInterval(thorwInterval);
      }
    }, 50);
  }

  /**
   * Models enemy damage if bottle hits enemy
   * @param {Object} enemy
   */
  modelEnemyDamage(enemy) {
    if (enemy instanceof Endboss) {
      this.world.endboss.hit();
      if (!gameMuted) {
        playAudioForMs(bottleBreakSound, 500);
        if (this.world.endboss.isDead()) playAudioForMs(enemyDeadSound, 1000);
        else {
          playAudioForMs(enemyHitSound, 500);
        }
      }
    }
    if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
      enemy.energy -= 100;
      if (!gameMuted) playAudioForMs(bottleBreakSound, 500);
    }
    enemy.latestAlive = new Date().getTime();
  }

  /**
   * Breaks bottle
   */
  breakBottle() {
    this.speedX = 0;
    this.isBroken = true;
    this.latestIntact = new Date().getTime();
  }

  /**
   * Models damage and bottle break of enemy is hit by bottle
   * @param {Object} enemy
   */
  bottleHitsEnemy(enemy) {
    this.playAnimation(this.imgsSplashing);
    if (!this.isBroken) this.modelEnemyDamage(enemy);
    this.breakBottle();
  }

  /**
   * Models bottle behaviour if bottle hits the ground
   */
  bottleHitsGround() {
    this.playAnimation(this.imgsSplashing);
    if (!gameMuted) playAudioForMs(bottleBreakSound, 500);
    this.breakBottle();
  }
}
