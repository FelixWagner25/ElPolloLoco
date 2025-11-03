class World {
  character = new Character();
  level = level1;
  endboss = this.level.enemies[this.level.enemies.length - 1];
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  statusbars = [
    new Statusbar("health", 20, 40),
    new Statusbar("bottles", 20, 80),
    new Statusbar("coins", 20, 120),
    new Statusbar("endboss", 500, 50),
  ];
  endgameStarted = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.runGameDynamics();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.cameraX, 0);

    this.removeDeadEnemiesFromWorld();
    this.removeBrokenBottlesFromWorld();

    this.addObjectsToWorld(this.level.backgroundLayers);
    this.addObjectsToWorld(this.level.clouds);
    this.addObjectsToWorld(this.level.bottles);
    this.addObjectsToWorld(this.level.coins);
    this.addObjectsToWorld(this.level.enemies);
    this.addToWorld(this.character);

    this.ctx.translate(-this.cameraX, 0);

    this.addObjectsToWorld(this.statusbars);

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
    obj.drawFrameOffset(this.ctx);

    if (obj.otherDirection == true) {
      this.flipImageBack(obj);
    }
  }

  removeDeadEnemiesFromWorld() {
    this.level.enemies = this.level.enemies.filter((enemy) => {
      if (enemy.isDead()) {
        return new Date().getTime() - enemy.latestAlive < 2000;
      } else {
        return true;
      }
    });
  }

  removeBrokenBottlesFromWorld() {
    this.level.bottles = this.level.bottles.filter((bottle) => {
      if (bottle.isBroken) {
        return new Date().getTime() - bottle.latestIntact < 500;
      } else {
        return true;
      }
    });
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
    this.level.bottles.forEach((bottle) => (bottle.world = this));
    this.endboss.world = this;
  }

  runGameDynamics() {
    setInterval(() => {
      if (this.endgameStarted == false) this.checkEndGameStarted();
      this.checkCollisions();
    }, dtGameDynamic);
    setInterval(() => {
      this.checkThrowObjects();
    }, dtUserAction);
  }

  checkThrowObjects() {
    if (this.keyboard.d && this.character.hasBottle()) {
      let bottle = new Bottle();
      bottle.world = this;
      this.level.bottles.push(bottle);
      bottle.throw(
        this.character.x + this.character.width - this.character.offset.right,
        this.character.y + this.character.offset.top
      );
      this.character.bottlesCollected -= 1;
      let statusBar = this.statusbars[1];
      statusBar.setImgByStatusValue("bottles", this.character.bottlesCollected);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead()) {
        if (this.character.isAboveGround() && !(enemy instanceof Endboss)) {
          enemy.hit();
        } else {
          this.character.hit();
        }
      }
    });
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.coinsCollected += 1;
        const index = this.level.coins.indexOf(coin);
        this.level.coins.splice(index, 1);
        let statusBar = this.statusbars[2];
        statusBar.setImgByStatusValue("coins", this.character.coinsCollected);
      }
    });
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.bottlesCollected += 1;
        const index = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(index, 1);
        let statusBar = this.statusbars[1];
        statusBar.setImgByStatusValue(
          "bottles",
          this.character.bottlesCollected
        );
      }
    });
  }

  checkEndGameStarted() {
    if (this.character.x >= endgameTrigger) this.endgameStarted = true;
  }
}
