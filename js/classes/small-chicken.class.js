class SmallChicken extends MovableObject {
  height = 50;
  width = 50;
  y = canvasHeightPx - this.height - 40;
  x = 200 + Math.random() * 500;
  v = 0.15 + Math.random() * 0.25;
  offset = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 10,
  };

  imgsWalking = [
    "../../img/img_pollo_locco/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "../../img/img_pollo_locco/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "../../img/img_pollo_locco/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor() {
    super();
    this.loadImage(
      "../../img/img_pollo_locco/3_enemies_chicken/chicken_small/1_walk/1_w.png"
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
        this.loadImage(
          "../../img/img_pollo_locco/3_enemies_chicken/chicken_small/2_dead/dead.png"
        );
      } else {
        this.playAnimation(this.imgsWalking);
      }
    }, 1000);
  }
}
