class Endboss extends MovableObject {
  height = 350;
  width = 200;
  y = canvasHeightPx - this.height - 20;
  x = 2500;
  v = 0;
  offset = {
    top: 70,
    bottom: 20,
    left: 10,
    right: 40,
  };
  world;

  imgsIdle = [
    "../../img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G5.png",
    "../../img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G6.png",
    "../../img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G7.png",
    "../../img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G8.png",
    "../../img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G9.png",
    "../../img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G10.png",
    "../../img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G11.png",
    "../../img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  imgsHurt = [
    "../../img/img_pollo_locco/4_enemie_boss_chicken/4_hurt/G21.png",
    "../../img/img_pollo_locco/4_enemie_boss_chicken/4_hurt/G22.png",
    "../../img/img_pollo_locco/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  imgsDead = [
    "../../img/img_pollo_locco/4_enemie_boss_chicken/5_dead/G24.png",
    "../../img/img_pollo_locco/4_enemie_boss_chicken/5_dead/G25.png",
    "../../img/img_pollo_locco/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super();
    this.loadImage(
      "../../img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G5.png"
    );
    this.loadImages(this.imgsIdle);
    this.loadImages(this.imgsHurt);
    this.loadImages(this.imgsDead);
    this.animate();
  }

  animate() {
    let animationInterval = setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(this.imgsHurt);
      } else if (this.isDead()) {
        this.playAnimation(this.imgsDead);
        setTimeout(() => {
          clearInterval(animationInterval);
          this.loadImage("");
        }, 2000);
      } else {
        this.playAnimation(this.imgsIdle);
      }
    }, 200);
  }
}
