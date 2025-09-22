class Cloud extends MovableObject {
  x;
  y = 50;
  width = 360;
  height = 250;
  v = 0.15;

  constructor(index) {
    super().loadImage(
      `../../img/img_pollo_locco/5_background/layers/4_clouds/${index}.png`
    );
    this.x = Math.random() * 360 * index;
    this.animateMovement();
  }

  animateMovement() {
    this.moveLeft();
  }
}
