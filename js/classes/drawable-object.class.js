class DrawableObject {
  height = 150;
  width = 100;
  x = 40;
  y = canvasHeightPx - this.height;

  img;
  imgsCache = {};
  currentImgIndx = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgsCache[path] = img;
    });
  }
}
