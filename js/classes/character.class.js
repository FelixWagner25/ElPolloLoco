class Character extends MovableObject {
  height = 240;
  width = 100;
  x = 100;
  //y = canvasHeightPx - this.height - 40;
  y = 100;
  v = 10;
  offset = {
    top: 120,
    bottom: 30,
    left: 40,
    right: 30,
  };

  imgsWalking = [
    "../../img/img_pollo_locco/2_character_pepe/2_walk/W-21.png",
    "../../img/img_pollo_locco/2_character_pepe/2_walk/W-22.png",
    "../../img/img_pollo_locco/2_character_pepe/2_walk/W-23.png",
    "../../img/img_pollo_locco/2_character_pepe/2_walk/W-24.png",
    "../../img/img_pollo_locco/2_character_pepe/2_walk/W-25.png",
    "../../img/img_pollo_locco/2_character_pepe/2_walk/W-26.png",
  ];

  imgsJumping = [
    "../../img/img_pollo_locco/2_character_pepe/3_jump/J-31.png",
    "../../img/img_pollo_locco/2_character_pepe/3_jump/J-32.png",
    "../../img/img_pollo_locco/2_character_pepe/3_jump/J-33.png",
    "../../img/img_pollo_locco/2_character_pepe/3_jump/J-34.png",
    "../../img/img_pollo_locco/2_character_pepe/3_jump/J-35.png",
    "../../img/img_pollo_locco/2_character_pepe/3_jump/J-36.png",
    "../../img/img_pollo_locco/2_character_pepe/3_jump/J-37.png",
    "../../img/img_pollo_locco/2_character_pepe/3_jump/J-38.png",
    "../../img/img_pollo_locco/2_character_pepe/3_jump/J-39.png",
  ];
  world;

  constructor() {
    super();
    this.loadImage(
      "../../img/img_pollo_locco/2_character_pepe/2_walk/W-21.png"
    );
    this.loadImages(this.imgsWalking);
    this.loadImages(this.imgsJumping);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (
        this.world.keyboard.right == true &&
        this.x < this.world.level.levelEndX
      ) {
        this.moveRight();
        this.otherDirection = false;
      }

      if (this.world.keyboard.left == true && this.x > -100) {
        this.moveLeft();
        this.otherDirection = true;
      }

      if (this.world.keyboard.up && !this.isAboveGround()) {
        this.jump();
      }

      this.world.cameraX = -this.x + 100;
    }, 50);

    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.imgsJumping);
      } else {
        if (this.world.keyboard.right || this.world.keyboard.left) {
          this.playAnimation(this.imgsWalking);
        }
      }
    }, 50);
  }
}
