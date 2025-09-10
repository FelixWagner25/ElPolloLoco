class Character extends MovableObject {
  height = 240;
  width = 100;
  x = 40;
  y = canvasHeightPx - this.height - 40;
  constructor() {
    super().loadImage(
      "../../img/img_pollo_locco/2_character_pepe/2_walk/W-21.png"
    );
  }

  jump() {}
}
