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

  constructor(kind, x, y) {
    super();
    this.kind = kind;
    this.x = x;
    this.y = y;
    this.loadImages(this.imgsHealth);
    this.loadImages(this.imgsCoins);
    this.loadImages(this.imgsBottles);
    this.setImgByPercentage("health", this.percentageHealth);
    this.setImgByPercentage("coins", this.coins);
    this.setImgByPercentage("bottles", this.bottles);
  }

  setImgByPercentage(statusbarKind, percentage) {
    let imgPercentage = percentage - (percentage % 20);
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
    }
    this.img = this.imgsCache[path];
  }
}
