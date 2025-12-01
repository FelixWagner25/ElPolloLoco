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
   * Draws frame around object on canvas
   * @param {object} ctx context on canvas
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof SmallChicken
    ) {
      ctx.lineWidth = "5";
      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Draws frame around object subtracting the object's offset
   * @param {object} ctx context on canvas
   */
  drawFrameOffset(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof SmallChicken
    ) {
      ctx.lineWidth = "5";
      ctx.beginPath();
      ctx.strokeStyle = "orange";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
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
