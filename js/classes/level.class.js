class Level {
  enemies;
  clouds;
  numberBackgroundLayers;
  backgroundLayers = [];

  constructor(enemies, clouds, numberBackgroundLayers) {
    (this.enemies = enemies),
      (this.clouds = clouds),
      (this.numberBackgroundLayers = numberBackgroundLayers);
    this.initBackgroundLayers(numberBackgroundLayers);
  }

  initBackgroundLayers(numberBgLayers) {
    let j;
    for (let i = -1; i < numberBgLayers; i++) {
      if (i < 0) {
        j = -(i % 2) + 1;
      } else {
        j = (i % 2) + 1;
      }
      this.backgroundLayers.push(
        new BackgroundLayer(
          `../../img/img_pollo_locco/5_background/layers/3_third_layer/${j}.png`,
          719 * i
        )
      );
      this.backgroundLayers.push(
        new BackgroundLayer(
          `../../img/img_pollo_locco/5_background/layers/2_second_layer/${j}.png`,
          719 * i
        )
      );
      this.backgroundLayers.push(
        new BackgroundLayer(
          `../../img/img_pollo_locco/5_background/layers/1_first_layer/${j}.png`,
          719 * i
        )
      );
    }
  }
}
