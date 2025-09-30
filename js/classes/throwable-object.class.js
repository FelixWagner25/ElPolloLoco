class ThrowableObject extends MovableObject {
  speedX = 20;
  speedY = 30;

  constructor() {
    super();
  }
  throw(x, y) {
    this.x = x + this.speedX;
    this.y = y;
    this.applyGravity();
    this.img = this.loadImage(
      "../../img/img_pollo_locco/6_salsa_bottle/salsa_bottle.png"
    );
  }
}
