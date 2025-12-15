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
    right: 30,
  };
  bottlesCollected = 0;
  coinsCollected = 0;
  latestActivityMs = 0;
  latestThrow = 0;
  latestHit = 0;
  latestJump = 0;
  timeOfDeath = null;
  snorringSoundPlaying = false;

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

  /**
   * @constructor
   */
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

  /**
   * Checks whether character has collected a bottle.
   * @returns boolean
   */
  hasBottle() {
    return this.bottlesCollected > 0;
  }

  /**
   * Animates Character Actions
   */
  animate() {
    this.animateMovement();
    this.animateImages();
  }

  /**
   * Animates character movement
   */
  animateMovement() {
    setInterval(() => {
      if (
        this.world.keyboard.right == true &&
        !this.isDead() &&
        this.x < this.world.level.levelEndX &&
        this.world.endboss.touchesCharacter() == false
      ) {
        this.moveRight();
        this.otherDirection = false;
      }
      if (this.world.keyboard.left == true && !this.isDead() && this.x > -100) {
        this.moveLeft();
        this.otherDirection = true;
      }
      if (
        (this.world.keyboard.space || this.world.keyboard.up) &&
        !this.isDead() &&
        !this.isAboveGround()
      ) {
        this.jump();
      }
      this.world.cameraX = -this.x + 100;
    }, 50);
  }

  /**
   * Animates character images of actions.
   */
  animateImages() {
    let animationInterval = setInterval(() => {
      if (this.isAboveGround() && !this.isDead()) {
        this.playAnimation(this.imgsJumping);
      } else if (this.isDead() && this.timeOfDeath !== null) {
        this.organizeDeathAnimation();
      } else if (this.isHurt() && !this.isDead()) {
        this.playAnimation(this.imgsHurt);
      } else if (this.isIdleForMs(3000) && !this.isDead()) {
        this.playAnimation(this.imgsLongIdle);
        if (!gameMuted && !this.snorringSoundPlaying) {
          playAudioForMs(snoringSound, 60000);
          this.snorringSoundPlaying = true;
        }
      } else {
        this.playAnimation(this.imgsIdle);
        if (this.snorringSoundPlaying) {
          snoringSound.pause();
          this.snorringSoundPlaying = false;
        }
      }
    }, 200);
    animationIntervals.push(animationInterval);
    this.animateWalkingImages();
  }

  /**
   * Processes character death animation
   */
  organizeDeathAnimation() {
    let currentTime = new Date().getTime();
    if (currentTime - this.timeOfDeath > 2000) {
      this.loadImage("img/img_pollo_locco/2_character_pepe/5_dead/D-57.png");
    } else {
      this.playAnimation(this.imgsDead);
    }
  }

  /**
   * Animates character walking images
   */
  animateWalkingImages() {
    let walkingInterval = setInterval(() => {
      if (
        (this.world.keyboard.right || this.world.keyboard.left) &&
        !this.isDead()
      ) {
        this.playAnimation(this.imgsWalking);
      }
    }, 100);
    animationIntervals.push(walkingInterval);
  }

  /**
   * Updates character's latest acitvity timestemp
   */
  updateLatestActivityMs() {
    this.latestActivityMs = new Date().getTime();
  }

  /**
   * Updates character's latest jump timestamp
   */
  updateLatestJump() {
    this.latestJump = new Date().getTime();
  }

  /**
   * Checks whether character is idle for defined time in ms.
   * @param {Integer} milliSeconds
   * @returns boolean
   */
  isIdleForMs(milliSeconds) {
    let currentTimeMs = new Date().getTime();
    return currentTimeMs - this.latestActivityMs > milliSeconds;
  }

  /**
   * Checks whether bottle throw cooldown has finished.
   * @returns boolean
   */
  finishedBottleCooldown() {
    let currentTime = new Date().getTime();
    return currentTime - this.latestThrow > dtBottleThrowCooldown;
  }

  /**
   * Checks whether character hit cooldown is finished.
   * @returns boolean
   */
  finishedHitCooldown() {
    let currentTime = new Date().getTime();
    return currentTime - this.latestHit > dtCharacterHitCooldown;
  }

  /**
   * Checks if character effectively touches ground
   * @returns boolean
   */
  isEffectivelyOnGround() {
    let currentTime = new Date().getTime();
    return currentTime - this.latestJump > dtCharacterStandsOnGround;
  }
}
