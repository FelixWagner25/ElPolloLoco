class Chicken extends MovableObject {
  height = 70;
  width = 70;

  v = 0.15 + Math.random() * 0.25;
  offset = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  };
  y = canvasHeightPx - 45 - this.height + this.offset.bottom; // 45px is the distance between canvas height and ground level y coodinate

  imgsWalking = [
    "img/img_pollo_locco/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/img_pollo_locco/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/img_pollo_locco/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /**
   * @constructor
   * @param {Integer} sectionNumber - background section where chicken is initialized in
   */
  constructor(sectionNumber) {
    super();
    this.x =
      200 + Math.random() * sectionLengthPx + sectionNumber * sectionLengthPx;
    this.loadImage(
      "img/img_pollo_locco/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.loadImages(this.imgsWalking);
    this.animate();
  }

  /**
   * Animates Chicken.
   */
  animate() {
    this.animateMovement();
    let animationInterval = setInterval(() => {
      if (this.isDead()) {
        this.animateDeath();
        clearInterval(animationInterval);
      } else {
        this.playAnimation(this.imgsWalking);
      }
    }, 250);
    animationIntervals.push(animationInterval);
  }

  /**
   * Animates movement of chicken.
   */
  animateMovement() {
    let movementInterval = setInterval(() => {
      this.moveLeft();
    }, this.dt);
    animationIntervals.push(movementInterval);
  }

  /**
   * Aniamtes death of chicken.
   */
  animateDeath() {
    this.v = 0;
    this.loadImage(
      "img/img_pollo_locco/3_enemies_chicken/chicken_normal/2_dead/dead.png"
    );
  }
}
