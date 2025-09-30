class Bottle extends CollectableObject {
  width = 50;
  height = 60;
  speedX = 60;
  speedY = 20;

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
    this.x = x;
    this.y = y;
    this.applyGravity();
    setInterval(() => {
      this.x += this.speedX;
    }, 30);
  }
}
