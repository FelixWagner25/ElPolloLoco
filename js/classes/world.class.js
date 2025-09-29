class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  statusbars = [
    new Statusbar(
      "../../img/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png"
    ),
  ];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.cameraX, 0);

    this.addObjectsToWorld(this.level.backgroundLayers);
    this.addObjectsToWorld(this.level.clouds);
    this.addObjectsToWorld(this.level.enemies);
    this.addToWorld(this.character);
    //this.addObjectsToWorld(this.statusbars);

    this.ctx.translate(-this.cameraX, 0);

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
      this.flipImage(obj);
    }

    obj.draw(this.ctx);
    obj.drawFrame(this.ctx);

    if (obj.otherDirection == true) {
      this.flipImageBack(obj);
    }
  }

  flipImage(obj) {
    this.ctx.save();
    this.ctx.translate(obj.width, 0);
    this.ctx.scale(-1, 1);
    obj.x = -1 * obj.x;
  }

  flipImageBack(obj) {
    obj.x = -1 * obj.x;
    this.ctx.restore();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          console.log(
            "Collision with character, energy = ",
            this.character.energy
          );
          this.character.hit();
        }
      });
    }, 200);
  }
}
