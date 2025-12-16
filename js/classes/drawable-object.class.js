class DrawableObject {
  height = 150;
  width = 100;
  x = 40;
  img;
  imgsCache = {};
  currentImgIndx = 0;

  /**
   * Creates image object and sets its source path.
   * @param {string} path image source path
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws image object on canvas context.
   * @param {object} ctx context
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (error) {
      console.warn("Error loading image", error);
      console.log("Could not load image,", this.img);
    }
  }

  /**
   * Loads all images from array to image chache.
   * @param {array} array images array
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgsCache[path] = img;
    });
  }
}
