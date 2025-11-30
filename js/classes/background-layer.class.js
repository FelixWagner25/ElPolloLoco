class BackgroundLayer extends MovableObject {
  width = 720;
  height = 400;

  /**
   * @constructor
   * @param {string} imgPath - path of image
   * @param {Integer} x - x coodinate on canvas
   */
  constructor(imgPath, x) {
    super().loadImage(imgPath);
    this.x = x;
    this.y = canvasHeightPx - this.height;
  }
}
