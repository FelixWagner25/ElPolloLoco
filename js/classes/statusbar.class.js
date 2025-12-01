class Statusbar extends DrawableObject {
  kind = "";
  img;
  x;
  y;
  width = 200;
  height = 60;
  percentageHealth = 100;
  coins = 0;
  bottles = 0;

  imgsHealth = [
    "img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  imgsCoins = [
    "img/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  imgsBottles = [
    "img/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  imgsEndboss = [
    "img/img_pollo_locco/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "img/img_pollo_locco/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/img_pollo_locco/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/img_pollo_locco/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "img/img_pollo_locco/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "img/img_pollo_locco/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  /**
   * @constructor
   * @param {string} kind - statusbar kind
   * @param {integer} x - x-coordinate on canvas
   * @param {integer} y - y-coordinate on canvas
   */
  constructor(kind, x, y) {
    super();
    this.kind = kind;
    this.x = x;
    this.y = y;
    this.loadImagesByKind(this.kind);
    let statusValue = this.getStatusValueByKind();
    this.setImgByStatusValue(this.kind, statusValue);
  }

  /**
   * Returns statusbar status value.
   * @returns integer
   */
  getStatusValueByKind() {
    switch (this.kind) {
      case "health":
      case "endboss":
        return this.percentageHealth;
      case "coins":
        return this.coins;
      case "bottles":
        return this.bottles;
    }
  }

  /**
   * Loads statubar images depending on statusbar kind into image cache.
   * @param {string} kind - statusbar kind
   */
  loadImagesByKind(kind) {
    switch (kind) {
      case "health":
        this.loadImages(this.imgsHealth);
        break;
      case "coins":
        this.loadImages(this.imgsCoins);
        break;
      case "bottles":
        this.loadImages(this.imgsBottles);
        break;
      case "endboss":
        this.loadImages(this.imgsEndboss);
        break;
    }
  }

  /**
   * Sets correct image from image cache matching curren status value to statusbar.
   * @param {string} statusbarKind - statusbar kind
   * @param {integer} percentage - statusbar value
   */
  setImgByStatusValue(statusbarKind, percentage) {
    let imgPercentage = this.getStatusbarImgPercentageValue(
      statusbarKind,
      percentage
    );
    let path = this.getStatusbarImgPath(statusbarKind, imgPercentage);
    this.img = this.imgsCache[path];
  }

  /**
   * Returns statusbar value matching to current value in game.
   * @param {string} statusbarKind - statubar kind
   * @param {integer} percentage - statusbar value
   * @returns integer
   */
  getStatusbarImgPercentageValue(statusbarKind, percentage) {
    let imgPercentage;
    switch (statusbarKind) {
      case "health":
      case "endboss":
        imgPercentage = percentage - (percentage % 20);
        break;
      case "coins":
        imgPercentage = this.getCoinStatusValue(percentage);
        break;
      case "bottles":
        imgPercentage = this.getBottleStatusValue(percentage);
        break;
    }
    return imgPercentage;
  }

  /**
   * Returns coin statubar value from coin value in game.
   * @param {integer} percentage - coin status value
   * @returns integer
   */
  getCoinStatusValue(percentage) {
    let imgPercentage;
    if (percentage < 20) {
      imgPercentage = (percentage - (percentage % 4)) * 5;
    } else {
      imgPercentage = 100;
    }
    return imgPercentage;
  }

  /**
   * Returns bottle statusbar value from bottle value in game.
   * @param {integer} percentage - bottle status value
   * @returns integer
   */
  getBottleStatusValue(percentage) {
    let imgPercentage;
    if (percentage < 6) {
      imgPercentage = percentage * 20;
    } else {
      imgPercentage = 100;
    }
    return imgPercentage;
  }

  /**
   * Returns matching image source path to statusbar kind and statusbar value.
   * @param {string} statusbarKind - statusbar kind
   * @param {integer} imgPercentage - integer
   * @returns string
   */
  getStatusbarImgPath(statusbarKind, imgPercentage) {
    let path = "";
    switch (statusbarKind) {
      case "health":
        path = `img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/${imgPercentage}.png`;
        break;
      case "coins":
        path = `img/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/blue/${imgPercentage}.png`;
        break;
      case "bottles":
        path = `img/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/blue/${imgPercentage}.png`;
        break;
      case "endboss":
        path = `img/img_pollo_locco/7_statusbars/2_statusbar_endboss/orange/orange${imgPercentage}.png`;
        break;
    }
    return path;
  }
}
