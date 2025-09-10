class BackgroundLayer extends MovableObject {
  x = 0;
  y = 0;
  width = 720;
  height = 400;

  constructor() {
    super().loadImage(
      "../../img/img_pollo_locco/5_background/layers/1_first_layer/1.png"
    );
  }
}
