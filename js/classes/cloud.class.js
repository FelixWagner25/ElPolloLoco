class Cloud extends MovableObject {
  x = Math.random() * 360;
  y = 50;
  width = 360;
  height = 250;

  constructor() {
    super().loadImage(
      "../../img/img_pollo_locco/5_background/layers/4_clouds/1.png"
    );
  }
}
