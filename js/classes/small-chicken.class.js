class SmallChicken extends MovableObject {
  height = 50;
  width = 50;
  v = 0.15 + Math.random() * 0.25;
  offset = {
    top: 5,
    bottom: 5,
    left: 8,
    right: 8,
  };
  y = canvasHeightPx - 45 - this.height + this.offset.bottom; // 45px is the distance between canvas height and ground level y coodinate

  imgsWalking = [
    "img/img_pollo_locco/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/img_pollo_locco/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/img_pollo_locco/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * @constructor
   * @param {integer} sectionNumber number of background section where small chicken is initialized
   */
  constructor(sectionNumber) {
    super();
    this.x =
      200 + Math.random() * sectionLengthPx + sectionNumber * sectionLengthPx;
    this.loadImage(
      "img/img_pollo_locco/3_enemies_chicken/chicken_small/1_walk/1_w.png"
    );
    this.loadImages(this.imgsWalking);
    this.animate();
  }

  /**
   * Animates small chicken movement and images
   */
  animate() {
    this.animateMovement();
    this.animateImages();
  }

  /**
   * Animates small chicken movement.
   */
  animateMovement() {
    let movementInterval = setInterval(() => {
      this.moveLeft();
    }, this.dt);
    animationIntervals.push(movementInterval);
  }

  /**
   * Animates small chicken images.
   */
  animateImages() {
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
   * Animates death of small chicken.
   */
  animateDeath() {
    this.v = 0;
    this.loadImage(
      "img/img_pollo_locco/3_enemies_chicken/chicken_small/2_dead/dead.png"
    );
  }
}
