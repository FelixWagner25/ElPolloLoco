class Cloud extends MovableObject {
  y = 50;
  width = 360;
  height = 250;
  v = 0.15;

  /**
   * @constructor
   * @param {Integer} sectionNumber - background section where cloud will be initialized
   */
  constructor(sectionNumber) {
    let index = (sectionNumber % 2) + 1;
    super().loadImage(
      `img/img_pollo_locco/5_background/layers/4_clouds/${index}.png`
    );
    this.x =
      Math.random() * sectionLengthPx +
      sectionNumber * sectionLengthPx +
      100 * sectionNumber;
    this.animateMovement();
  }

  /**
   * Animates Cloud movement.
   */
  animateMovement() {
    this.moveLeft();
  }
}
