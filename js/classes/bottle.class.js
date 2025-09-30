class Bottle extends CollectableObject {
  width = 50;
  height = 80;
  speedX = 20;
  speedY = 30;

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
    this.loadImage("../../img/img_pollo_locco/6_salsa_bottle/salsa_bottle.png");
    this.x = x + this.speedX;
    this.y = y;
    this.applyGravity();
  }
}
