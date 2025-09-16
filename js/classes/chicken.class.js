class Chicken extends MovableObject {
  height = 60;
  width = 60;
  y = canvasHeightPx - this.height - 40;
  x = 200 + Math.random() * 500;
  v = 0.15 + Math.random() * 0.25;

  imgsWalking = [
    "../../img/img_pollo_locco/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../../img/img_pollo_locco/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../../img/img_pollo_locco/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  currentImgIndx = 0;

  constructor() {
    super();
    this.loadImage(
      "../../img/img_pollo_locco/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.loadImages(this.imgsWalking);
    this.walking();
  }

  walking() {
    this.moveLeft();

    setInterval(() => {
      this.currentImgIndx = this.currentImgIndx % this.imgsWalking.length;
      let path = this.imgsWalking[this.currentImgIndx];
      this.img = this.imgsCache[path];
      this.currentImgIndx++;
    }, 1000);
  }
}
