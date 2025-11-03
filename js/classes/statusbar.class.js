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
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  imgsCoins = [
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  imgsBottles = [
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  imgsEndboss = [
    "../../img/img_pollo_locco/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "../../img/img_pollo_locco/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "../../img/img_pollo_locco/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "../../img/img_pollo_locco/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "../../img/img_pollo_locco/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "../../img/img_pollo_locco/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  constructor(kind, x, y) {
    super();
    this.kind = kind;
    this.x = x;
    this.y = y;
    this.loadImagesByKind(this.kind);
    let statusValue = this.getStatusValueByKind();
    this.setImgByStatusValue(this.kind, statusValue);
  }

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

  setImgByStatusValue(statusbarKind, percentage) {
    let imgPercentage;
    switch (statusbarKind) {
      case "health":
      case "endboss":
        imgPercentage = percentage - (percentage % 20);
        break;
      case "coins":
        if (percentage < 20) {
          imgPercentage = (percentage - (percentage % 4)) * 5;
        } else {
          imgPercentage = 100;
        }
        break;
      case "bottles":
        if (percentage < 6) {
          imgPercentage = percentage * 20;
        } else {
          imgPercentage = 100;
        }
        break;
    }

    let path = "";
    switch (statusbarKind) {
      case "health":
        path = `../../img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/${imgPercentage}.png`;
        break;
      case "coins":
        path = `../../img/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/blue/${imgPercentage}.png`;
        break;
      case "bottles":
        path = `../../img/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/blue/${imgPercentage}.png`;
        break;
      case "endboss":
        path = `../../img/img_pollo_locco/7_statusbars/2_statusbar_endboss/orange/orange${imgPercentage}.png`;
        break;
    }
    this.img = this.imgsCache[path];
  }
}
