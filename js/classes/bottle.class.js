class Bottle extends CollectableObject {
  width = 50;
  height = 60;
  speedX = 60;
  speedY = 20;
  offset = {
    top: 7,
    bottom: 6,
    left: 20,
    right: 40,
  };
  world;

  imgsRotating = [
    "../../img/img_pollo_locco/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "../../img/img_pollo_locco/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "../../img/img_pollo_locco/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "../../img/img_pollo_locco/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  imgsSplashing = [
    "../../img/img_pollo_locco/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "../../img/img_pollo_locco/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "../../img/img_pollo_locco/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "../../img/img_pollo_locco/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "../../img/img_pollo_locco/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "../../img/img_pollo_locco/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor() {
    super();
    let randomInt = Math.round(Math.random());
    this.loadImage(
      `../../img/img_pollo_locco/6_salsa_bottle/${
        randomInt + 1
      }_salsa_bottle_on_ground.png`
    );
    this.loadImages(this.imgsRotating);
    this.loadImages(this.imgsSplashing);
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    setInterval(() => {
      this.x += this.speedX;
      this.playAnimation(this.imgsRotating);
      this.world.level.enemies.forEach((enemy) => {
        if (this.isColliding(enemy)) {
          this.playAnimation(this.imgsSplashing);
          setTimeout(() => {
            let i = this.world.level.bottles.indexOf(this);
            this.world.level.bottles.splice(i, 1);
          }, 500);
          if (enemy instanceof Endboss) {
            this.world.endboss.hit();
          }
          if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
            enemy.energy -= 100;
            setTimeout(() => {
              let i = this.world.level.enemies.indexOf(enemy);
              this.world.level.enemies.splice(i, 1);
            }, 1000);
          }
        }
      });
      if (!this.isAboveGround()) {
        this.playAnimation(this.imgsSplashing);
      }
    }, 50);
    this.applyGravity();
  }
}
