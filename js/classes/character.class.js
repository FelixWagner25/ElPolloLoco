class Character extends MovableObject {
  height = 240;
  width = 100;
  x = 100;
  y = canvasHeightPx - this.height - 40;
  v = 10;
  imgsWalking = [
    "../../img/img_pollo_locco/2_character_pepe/2_walk/W-21.png",
    "../../img/img_pollo_locco/2_character_pepe/2_walk/W-22.png",
    "../../img/img_pollo_locco/2_character_pepe/2_walk/W-23.png",
    "../../img/img_pollo_locco/2_character_pepe/2_walk/W-24.png",
    "../../img/img_pollo_locco/2_character_pepe/2_walk/W-25.png",
    "../../img/img_pollo_locco/2_character_pepe/2_walk/W-26.png",
  ];
  currentImgIndx = 0;
  world;

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
      if (
        this.world.keyboard.right == true &&
        this.x < this.world.level.levelEndX
      ) {
        this.x += this.v;
        this.otherDirection = false;
      }

      if (this.world.keyboard.left == true && this.x > -100) {
        this.x -= this.v;
        this.otherDirection = true;
      }
      this.world.cameraX = -this.x + 100;
    }, 50);

    setInterval(() => {
      if (this.world.keyboard.right || this.world.keyboard.left) {
        this.currentImgIndx = this.currentImgIndx % this.imgsWalking.length;
        let path = this.imgsWalking[this.currentImgIndx];
        this.img = this.imgsCache[path];
        this.currentImgIndx++;
      }
    }, 50);
  }

  jump() {}
}
