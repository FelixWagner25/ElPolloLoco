class Endboss extends MovableObject {
  height = 350;
  width = 200;
  y = canvasHeightPx - this.height - 20;
  x = 2500;
  v = 0;

  imgsWalking = [
    "../../img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G5.png",
    "../../img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G6.png",
    "../../img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G7.png",
    "../../img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G8.png",
    "../../img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G9.png",
    "../../img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G10.png",
    "../../img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G11.png",
    "../../img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  constructor() {
    super();
    this.loadImage(
      "../../img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G5.png"
    );
    this.loadImages(this.imgsWalking);
    this.animate();
  }

  animate() {
    this.moveLeft();

    setInterval(() => {
      this.playAnimation(this.imgsWalking);
    }, 1000);
  }
}
