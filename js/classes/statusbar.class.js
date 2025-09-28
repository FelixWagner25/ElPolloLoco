class Statusbar extends DrawableObject {
  img;
  x;
  y;
  width = 100;
  height = 20;

  constructor(img, x, y, width, height) {
    super();
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.loadImage(img);
  }
}
