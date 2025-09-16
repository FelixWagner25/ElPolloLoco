class Character extends MovableObject {
  height = 240;
  width = 100;
  x = 40;
  y = canvasHeightPx - this.height - 40;
  imgsWalking = [
    "../../img/img_pollo_locco/2_character_pepe/2_walk/W-21.png",
    "../../img/img_pollo_locco/2_character_pepe/2_walk/W-22.png",
    "../../img/img_pollo_locco/2_character_pepe/2_walk/W-23.png",
    "../../img/img_pollo_locco/2_character_pepe/2_walk/W-24.png",
    "../../img/img_pollo_locco/2_character_pepe/2_walk/W-25.png",
    "../../img/img_pollo_locco/2_character_pepe/2_walk/W-26.png",
  ];
  currentImgIndx = 0;

  constructor() {
    super();
    this.loadImage(
      "../../img/img_pollo_locco/2_character_pepe/2_walk/W-21.png"
    );
    this.loadImages(this.imgsWalking);
    this.walking();
  }

  walking() {
    setInterval(() => {
      let i = this.currentImgIndx % this.imgsWalking.length;
      this.loadImage(this.imgsWalking[i]);
      this.currentImgIndx++;
    }, 1000);
  }

  jump() {}
}
