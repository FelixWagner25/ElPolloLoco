class Chicken extends MovableObject {
  height = 60;
  width = 60;
  y = canvasHeightPx - this.height - 40;
  x = 200 + Math.random() * 500;
  constructor() {
    super().loadImage(
      "../../img/img_pollo_locco/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
  }
}
