class Chicken extends MovableObject {
  height = 70;
  width = 70;
  y = canvasHeightPx - this.height - 40;

  v = 0.15 + Math.random() * 0.25;
  offset = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 10,
  };

  imgsWalking = [
    "../../img/img_pollo_locco/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../../img/img_pollo_locco/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../../img/img_pollo_locco/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor(sectionNumber) {
    super();
    this.x =
      200 + Math.random() * sectionLengthPx + sectionNumber * sectionLengthPx;
    this.loadImage(
      "../../img/img_pollo_locco/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.loadImages(this.imgsWalking);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, this.dt);

    setInterval(() => {
      if (this.isDead()) {
        this.v = 0;
        this.loadImage(
          "img/img_pollo_locco/3_enemies_chicken/chicken_normal/2_dead/dead.png"
        );
      } else {
        this.playAnimation(this.imgsWalking);
      }
    }, 1000);
  }
}
