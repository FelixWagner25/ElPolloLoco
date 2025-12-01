class Level {
  enemies;
  clouds;
  bottles;
  coins;
  numberBackgroundLayers;
  backgroundLayers = [];
  levelEndX;

  constructor(enemies, clouds, bottles, coins, numberBackgroundLayers) {
    (this.enemies = enemies),
      (this.clouds = clouds),
      (this.bottles = bottles),
      (this.coins = coins),
      (this.numberBackgroundLayers = numberBackgroundLayers);

    this.levelEndX = (this.numberBackgroundLayers - 1) * 719;
    this.initBackgroundLayers(numberBackgroundLayers);
  }

  /**
   * Initializes background layers
   * @param {integer} numberBgLayers - number of initialized background layers
   */
  initBackgroundLayers(numberBgLayers) {
    let j;
    for (let i = -1; i < numberBgLayers; i++) {
      j = this.moduloMapper(i);
      this.backgroundLayers.push(
        new BackgroundLayer(
          `img/img_pollo_locco/5_background/layers/3_third_layer/${j}.png`,
          719 * i
        )
      );
      this.backgroundLayers.push(
        new BackgroundLayer(
          `img/img_pollo_locco/5_background/layers/2_second_layer/${j}.png`,
          719 * i
        )
      );
      this.backgroundLayers.push(
        new BackgroundLayer(
          `img/img_pollo_locco/5_background/layers/1_first_layer/${j}.png`,
          719 * i
        )
      );
    }
  }

  /**
   * Maps modulo to positive values also for negative input and adds 1 because of path names of source images.
   * @param {integer} i
   * @returns integer
   */
  moduloMapper(i) {
    let j;
    if (i < 0) {
      j = -(i % 2) + 1;
    } else {
      j = (i % 2) + 1;
    }
    return j;
  }
}
