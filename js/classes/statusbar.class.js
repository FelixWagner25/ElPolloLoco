class Statusbar extends DrawableObject {
  img;
  x;
  y;
  width = 100;
  height = 20;
  percentage;

  imgs = [
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "../../img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  constructor(percentage, x, y) {
    super();
    this.percentage = percentage;
    this.x = x;
    this.y = y;
    this.loadImages(this.imgs);
    this.setImgByPercentage(this.percentage);
  }

  setImgByPercentage() {
    let imgPercentage = this.percentage - (this.percentage % 20);
    let path = `../../img/img_pollo_locco/7_statusbars/1_statusbar/2_statusbar_health/blue/${imgPercentage}.png`;
    this.img = this.imgsCache[path];
  }
}
