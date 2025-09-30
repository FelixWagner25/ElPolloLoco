class Bottle extends ThrowableObject {
  width = 50;
  height = 80;

  constructor() {
    super();
    this.x = 100 + Math.random() * 360;
    this.y = 360;
    let randomInt = Math.round(Math.random());
    this.loadImage(
      `../../img/img_pollo_locco/6_salsa_bottle/${
        randomInt + 1
      }_salsa_bottle_on_ground.png`
    );
  }
}
