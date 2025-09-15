class Cloud extends MovableObject {
  x = Math.random() * 360;
  y = 50;
  width = 360;
  height = 250;
  v = 0.15;
  dt = 17; // in MilliSeconds

  constructor() {
    super().loadImage(
      "../../img/img_pollo_locco/5_background/layers/4_clouds/1.png"
    );
    this.animateMovement();
  }

  animateMovement() {
    setInterval(() => {
      this.x = this.x - this.v;
    }, this.dt);
  }
}
