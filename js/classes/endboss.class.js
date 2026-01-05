class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = canvasHeightPx - this.height - 20;
  x = 2500;
  v = 20;
  offset = {
    top: 70,
    bottom: 20,
    left: 30,
    right: 60,
  };
  latestHit = 0;
  world;
  energy = 10;
  deathAnimationStarted = false;
  deathImgIndex = 0;
  deathAnimationFinished = false;

  imgsIdle = [
    "img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G5.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G6.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G7.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G8.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G9.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G10.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G11.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  imgsHurt = [
    "img/img_pollo_locco/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  imgsDead = [
    "img/img_pollo_locco/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/4_hurt/G23.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/4_hurt/G23.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/5_dead/G24.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/5_dead/G25.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  imgsAttack = [
    "img/img_pollo_locco/4_enemie_boss_chicken/3_attack/G13.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/3_attack/G14.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/3_attack/G15.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/3_attack/G16.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/3_attack/G17.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/3_attack/G18.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/3_attack/G19.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  imgsWalking = [
    "img/img_pollo_locco/4_enemie_boss_chicken/1_walk/G1.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/1_walk/G2.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/1_walk/G3.png",
    "img/img_pollo_locco/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /**
   * @constructor
   */
  constructor() {
    super();
    this.loadImage("img/img_pollo_locco/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.imgsIdle);
    this.loadImages(this.imgsHurt);
    this.loadImages(this.imgsDead);
    this.loadImages(this.imgsAttack);
    this.loadImages(this.imgsWalking);
    this.animate();
  }

  /**
   * Animates Endboss movement and images.
   */
  animate() {
    let animationIntervall = setInterval(() => {
      if (this.isHurt() && !this.isDead()) {
        this.playAnimation(this.imgsHurt);
        this.moveLeft();
      } else if (this.isDead()) {
        this.organizeDeathAnimation(animationIntervall);
      } else if (this.touchesCharacter()) {
        this.playAnimation(this.imgsAttack);
      } else if (this.world.endgameStarted && !this.isDead()) {
        this.playAnimation(this.imgsWalking);
        this.moveLeft();
      } else {
        this.playAnimation(this.imgsIdle);
      }
    }, 200);
    animationIntervals.push(animationIntervall);
  }

  /**
   * Checks whether endboss touches the character or not.
   * @returns boolean
   */
  touchesCharacter() {
    return (
      this.x + this.offset.left <
      this.world.character.x +
        this.world.character.width -
        this.world.character.offset.right
    );
  }

  /**
   * Organizes endboss death animation
   * @param {object} animationInterval
   */
  organizeDeathAnimation(animationInterval) {
    if (!this.deathStarted) {
      this.deathStarted = true;
      this.deadFrameIndex = 0;
      this.deathAnimationFinished = false;
    }
    if (!this.deathAnimationFinished) {
      this.playAnimationOnce(this.imgsDead);
    } else {
      this.loadImage("img/img_pollo_locco/2_character_pepe/5_dead/D-57.png");
      clearInterval(animationInterval);
    }
  }

  /**
   * Plays animation one time only.
   * @param {array} imgsArray
   */
  playAnimationOnce(imgsArray) {
    let path = imgsArray[this.deathImgIndex];
    this.img = this.imgsCache[path];

    if (this.deathImgIndex < imgsArray.length - 1) {
      this.deathImgIndex++;
    } else {
      this.deathAnimationFinished = true;
    }
  }
}
