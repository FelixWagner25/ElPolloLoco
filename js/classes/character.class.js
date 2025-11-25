class Character extends MovableObject {
  height = 260;
  width = 120;
  x = 100;
  y = canvasHeightPx - this.height - 30;
  v = 10;
  offset = {
    top: 130,
    bottom: 10,
    left: 25,
    right: 60,
  };
  bottlesCollected = 0;
  coinsCollected = 0;
  latestActivityMs = 0;
  timeOfDeath = null;

  imgsIdle = [
    "img/img_pollo_locco/2_character_pepe/1_idle/idle/I-1.png",
    "img/img_pollo_locco/2_character_pepe/1_idle/idle/I-2.png",
    "img/img_pollo_locco/2_character_pepe/1_idle/idle/I-3.png",
    "img/img_pollo_locco/2_character_pepe/1_idle/idle/I-4.png",
    "img/img_pollo_locco/2_character_pepe/1_idle/idle/I-5.png",
    "img/img_pollo_locco/2_character_pepe/1_idle/idle/I-6.png",
    "img/img_pollo_locco/2_character_pepe/1_idle/idle/I-7.png",
    "img/img_pollo_locco/2_character_pepe/1_idle/idle/I-8.png",
    "img/img_pollo_locco/2_character_pepe/1_idle/idle/I-9.png",
    "img/img_pollo_locco/2_character_pepe/1_idle/idle/I-10.png",
  ];

  imgsLongIdle = [
    "img/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  imgsWalking = [
    "img/img_pollo_locco/2_character_pepe/2_walk/W-21.png",
    "img/img_pollo_locco/2_character_pepe/2_walk/W-22.png",
    "img/img_pollo_locco/2_character_pepe/2_walk/W-23.png",
    "img/img_pollo_locco/2_character_pepe/2_walk/W-24.png",
    "img/img_pollo_locco/2_character_pepe/2_walk/W-25.png",
    "img/img_pollo_locco/2_character_pepe/2_walk/W-26.png",
  ];

  imgsJumping = [
    "img/img_pollo_locco/2_character_pepe/3_jump/J-31.png",
    "img/img_pollo_locco/2_character_pepe/3_jump/J-32.png",
    "img/img_pollo_locco/2_character_pepe/3_jump/J-33.png",
    "img/img_pollo_locco/2_character_pepe/3_jump/J-34.png",
    "img/img_pollo_locco/2_character_pepe/3_jump/J-35.png",
    "img/img_pollo_locco/2_character_pepe/3_jump/J-36.png",
    "img/img_pollo_locco/2_character_pepe/3_jump/J-37.png",
    "img/img_pollo_locco/2_character_pepe/3_jump/J-38.png",
    "img/img_pollo_locco/2_character_pepe/3_jump/J-39.png",
  ];

  imgsDead = [
    "img/img_pollo_locco/2_character_pepe/5_dead/D-51.png",
    "img/img_pollo_locco/2_character_pepe/5_dead/D-52.png",
    "img/img_pollo_locco/2_character_pepe/5_dead/D-53.png",
    "img/img_pollo_locco/2_character_pepe/5_dead/D-54.png",
    "img/img_pollo_locco/2_character_pepe/5_dead/D-55.png",
    "img/img_pollo_locco/2_character_pepe/5_dead/D-56.png",
    "img/img_pollo_locco/2_character_pepe/5_dead/D-57.png",
  ];

  imgsHurt = [
    "img/img_pollo_locco/2_character_pepe/4_hurt/H-41.png",
    "img/img_pollo_locco/2_character_pepe/4_hurt/H-42.png",
    "img/img_pollo_locco/2_character_pepe/4_hurt/H-43.png",
  ];
  world;

  constructor() {
    super();
    this.loadImage("img/img_pollo_locco/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.imgsIdle);
    this.loadImages(this.imgsLongIdle);
    this.loadImages(this.imgsWalking);
    this.loadImages(this.imgsJumping);
    this.loadImages(this.imgsDead);
    this.loadImages(this.imgsHurt);
    this.applyGravity();
    this.animate();
    this.updateLatestActivityMs();
  }

  hasBottle() {
    return this.bottlesCollected > 0;
  }

  animate() {
    setInterval(() => {
      if (
        this.world.keyboard.right == true &&
        this.x < this.world.level.levelEndX
      ) {
        this.moveRight();
        this.updateLatestActivityMs();
        this.otherDirection = false;
      }

      if (this.world.keyboard.left == true && this.x > -100) {
        this.moveLeft();
        this.updateLatestActivityMs();
        this.otherDirection = true;
      }

      if (
        (this.world.keyboard.space || this.world.keyboard.up) &&
        !this.isAboveGround()
      ) {
        this.jump();
        this.updateLatestActivityMs();
      }

      this.world.cameraX = -this.x + 100;
    }, 50);

    let animationInterval = setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.imgsJumping);
      } else if (this.isDead() && this.timeOfDeath !== null) {
        let currentTime = new Date().getTime();
        if (currentTime - this.timeOfDeath > 2000) {
          this.character.loadImage(
            "img/img_pollo_locco/2_character_pepe/5_dead/D-57.png"
          );
        } else {
          this.playAnimation(this.imgsDead);
        }
      } else if (this.isHurt()) {
        this.playAnimation(this.imgsHurt);
      } else if (this.isIdleForMs(6000)) {
        this.playAnimation(this.imgsLongIdle);
      } else {
        this.playAnimation(this.imgsIdle);
      }
    }, 200);
    animationIntervals.push(animationInterval);
    let walkingInterval = setInterval(() => {
      if (this.world.keyboard.right || this.world.keyboard.left) {
        this.playAnimation(this.imgsWalking);
      }
    }, 100);
    animationIntervals.push(walkingInterval);
  }

  updateLatestActivityMs() {
    this.latestActivityMs = new Date().getTime();
  }

  isIdleForMs(milliSeconds) {
    let currentTimeMs = new Date().getTime();
    return currentTimeMs - this.latestActivityMs > milliSeconds;
  }
}
