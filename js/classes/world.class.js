class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  backgroundLayers = [new BackgroundLayer()];
  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addToWorld(this.character);
    this.addObjectsToWorld(this.enemies);
    this.addObjectsToWorld(this.clouds);
    this.addObjectsToWorld(this.backgroundLayers);

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
    this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
  }
}
