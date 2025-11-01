class Coin extends CollectableObject {
  y = 200 + Math.random() * 100;
  width = 80;
  height = 80;

  imgs = [
    "../../img/img_pollo_locco/8_coin/coin_1.png",
    "../../img/img_pollo_locco/8_coin/coin_2.png",
  ];

  constructor() {
    super();
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
