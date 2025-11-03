class Coin extends CollectableObject {
  width = 80;
  height = 80;
  imgs = [
    "../../img/img_pollo_locco/8_coin/coin_1.png",
    "../../img/img_pollo_locco/8_coin/coin_2.png",
  ];

  constructor(sectionNumber) {
    super();
    this.x =
      100 + Math.random() * sectionLengthPx + sectionNumber * sectionLengthPx;
    this.y = 200 + Math.random() * 100;
    this.loadImage("../../img/img_pollo_locco/8_coin/coin_1.png");
    this.loadImages(this.imgs);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.imgs);
    }, 500);
  }
}
