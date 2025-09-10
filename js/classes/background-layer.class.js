class BackgroundLayer extends MovableObject {
  width = 720;
  height = 400;

  constructor(imgPath, x) {
    super().loadImage(imgPath);
    this.x = x;
    this.y = canvasHeightPx - this.height;
  }
}
