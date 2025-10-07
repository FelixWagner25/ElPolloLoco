class Bottle extends CollectableObject {
  width = 50;
  height = 60;
  speedX = 30;
  speedY = 20;

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
  }

  throw(x, y) {
    this.loadImages(this.imgsRotating);

    this.x = x;
    this.y = y;
    this.applyGravity();
    setInterval(() => {
      this.x += this.speedX;
      this.playAnimation(this.imgsRotating);
    }, 17);
  }
}
