class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  backgroundLayers = [
    new BackgroundLayer(
      "../../img/img_pollo_locco/5_background/layers/3_third_layer/1.png",
      0
    ),
    new BackgroundLayer(
      "../../img/img_pollo_locco/5_background/layers/2_second_layer/1.png",
      0
    ),
    new BackgroundLayer(
      "../../img/img_pollo_locco/5_background/layers/1_first_layer/1.png",
      0
    ),
  ];
  canvas;
  ctx;
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectsToWorld(this.backgroundLayers);
    this.addObjectsToWorld(this.clouds);
    this.addObjectsToWorld(this.enemies);
    this.addToWorld(this.character);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToWorld(objects) {
    for (let i = 0; i < objects.length; i++) {
      this.addToWorld(objects[i]);
    }
  }

  addToWorld(obj) {
    if (obj.otherDirection == true) {
      this.ctx.save();
      this.ctx.translate(obj.width, 0);
      this.ctx.scale(-1, 1);
      obj.x = -1 * obj.x;
    }
    this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    if (obj.otherDirection == true) {
      obj.x = -1 * obj.x;
      this.ctx.restore();
    }
  }

  setWorld() {
    this.character.world = this;
  }
}
