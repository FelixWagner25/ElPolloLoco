class World {
  character = new Character();
  level = level1;
  endboss = this.level.enemies[this.level.enemies.length - 1];
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  statusbars = [
    new Statusbar("health", 20, 0),
    new Statusbar("bottles", 20, 40),
    new Statusbar("coins", 20, 80),
    new Statusbar("endboss", 500, 60),
  ];
  endgameStarted = false;
  actionIntervals = [];

  /**
   * @constructor
   * @param {object} canvas - canvas object
   * @param {object} keyboard - keyboard object
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.runGameDynamics();
  }

  /**
   * Draws canvas depending on game status.
   */
  draw() {
    if (gameStatus == "open") {
      this.drawOpenGameWorld();
    } else if (gameStatus == "lost") {
      this.clearAllAnimationsAndSounds();
      showEndScreen("end-screen-lost");
    } else if (gameStatus == "won") {
      this.clearAllAnimationsAndSounds();
      showEndScreen("end-screen-won");
    }
  }

  /**
   * Draws canvas for open game status.
   */
  drawOpenGameWorld() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.setGameStatus();
    this.removeRedundantObjectsFromWorld();
    this.addAllObjectsToWorld();
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds all objects to world.
   */
  addAllObjectsToWorld() {
    this.ctx.translate(this.cameraX, 0);

    this.addObjectsToWorld(this.level.backgroundLayers);
    this.addObjectsToWorld(this.level.clouds);
    this.addObjectsToWorld(this.level.bottles);
    this.addObjectsToWorld(this.level.coins);
    this.addObjectsToWorld(this.level.enemies);
    this.addToWorld(this.character);

    this.ctx.translate(-this.cameraX, 0);

    this.addObjectsToWorld(this.statusbars);
  }

  /**
   * Removes broken bottles and killed enemies from world.
   */
  removeRedundantObjectsFromWorld() {
    this.removeDeadEnemiesFromWorld();
    this.removeBrokenBottlesFromWorld();
  }

  /**
   * Adds objects to world.
   * @param {array} objects
   */
  addObjectsToWorld(objects) {
    for (let i = 0; i < objects.length; i++) {
      this.addToWorld(objects[i]);
    }
  }

  /**
   * Adds object to world.
   * @param {object} obj
   */
  addToWorld(obj) {
    if (obj.otherDirection == true) {
      this.flipImage(obj);
    }
    obj.draw(this.ctx);
    // obj.drawFrame(this.ctx);
    // obj.drawFrameOffset(this.ctx);
    if (obj.otherDirection == true) {
      this.flipImageBack(obj);
    }
  }

  /**
   * Removes dead enemies from world.
   */
  removeDeadEnemiesFromWorld() {
    this.level.enemies = this.level.enemies.filter((enemy) => {
      if (enemy.isDead()) {
        return new Date().getTime() - enemy.latestAlive < 2000;
      } else {
        return true;
      }
    });
  }

  /**
   * Removes broken bottles from world
   */
  removeBrokenBottlesFromWorld() {
    this.level.bottles = this.level.bottles.filter((bottle) => {
      if (bottle.isBroken) {
        return new Date().getTime() - bottle.latestIntact < 500;
      } else {
        return true;
      }
    });
  }

  /**
   * Mirrors image of an object on the y axis.
   * @param {object} obj
   */
  flipImage(obj) {
    this.ctx.save();
    this.ctx.translate(obj.width, 0);
    this.ctx.scale(-1, 1);
    obj.x = -1 * obj.x;
  }

  /**
   * Restores former mirrored object's orientation back.
   * @param {object} obj
   */
  flipImageBack(obj) {
    obj.x = -1 * obj.x;
    this.ctx.restore();
  }

  /**
   * Sets world to character bottle and endboss object.
   */
  setWorld() {
    this.character.world = this;
    this.level.bottles.forEach((bottle) => (bottle.world = this));
    this.endboss.world = this;
  }

  /**
   * Runs game dynamics.
   */
  runGameDynamics() {
    let collsionCheckInterval = setInterval(() => {
      if (this.endgameStarted == false) this.checkEndGameStarted();
      this.checkCollisions();
    }, dtGameDynamic);
    this.actionIntervals.push(collsionCheckInterval);
    let throwCheckInterval = setInterval(() => {
      this.checkThrowObjects();
    }, dtUserAction);
    this.actionIntervals.push(throwCheckInterval);
  }

  /**
   * Checks whether character throws object. If object is thrown, then throw process is conducted.
   */
  checkThrowObjects() {
    if (
      this.keyboard.d &&
      this.character.hasBottle() &&
      this.character.otherDirection == false &&
      this.character.finishedBottleCooldown()
    ) {
      this.modelBottleThrow();
      this.character.bottlesCollected -= 1;
      let statusBar = this.statusbars[1];
      statusBar.setImgByStatusValue("bottles", this.character.bottlesCollected);
    }
  }

  /**
   * Models bottle throw.
   */
  modelBottleThrow() {
    let bottle = new Bottle();
    bottle.world = this;
    this.level.bottles.push(bottle);
    bottle.throw(
      this.character.x + this.character.width - this.character.offset.right,
      this.character.y + this.character.offset.top
    );
  }

  /**
   * Checks collision of character with enemys, coins or bottels.
   */
  checkCollisions() {
    this.checkEnemyCollision();
    this.checkCoinsCollision();
    this.checkBottleCollision();
  }

  /**
   * Checks collsion of character with enemy and processes collison.
   */
  checkEnemyCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead()) {
        if (this.character.isAboveGround() && !(enemy instanceof Endboss)) {
          enemy.hit();
          if (!gameMuted) playAudioForMs(enemyHitSound, 250);
        } else {
          this.character.hit();
          if (this.character.isDead() && this.character.timeOfDeath === null) {
            this.character.timeOfDeath = new Date().getTime();
          }
          if (!gameMuted) this.processCharacterHitSounds();
        }
      }
    });
  }

  /**
   * Processes sound if character is hit.
   */
  processCharacterHitSounds() {
    if (this.character.isDead()) playAudioForMs(characterDeadSound, 500);
    else {
      playAudioForMs(characterHitSound, 250);
    }
  }

  /**
   * Checks if character collides with coins and processes the coin collection.
   */
  checkCoinsCollision() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.coinsCollected += 1;
        const index = this.level.coins.indexOf(coin);
        this.level.coins.splice(index, 1);
        let statusBar = this.statusbars[2];
        statusBar.setImgByStatusValue("coins", this.character.coinsCollected);
        if (!gameMuted) playAudioForMs(collectedCoinSound, 250);
      }
    });
  }

  /**
   * Checks whether character collides with bottle and processes bottle collection.
   */
  checkBottleCollision() {
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
        if (!gameMuted) playAudioForMs(collectedBottleSound, 250);
      }
    });
  }

  /**
   * Checks whether character reached endgame distance.
   */
  checkEndGameStarted() {
    if (this.character.x >= endgameTrigger) this.endgameStarted = true;
  }

  /**
   * Clears all animation intervals and stops all audios.
   */
  clearAllAnimationsAndSounds() {
    for (let i = 0; i < animationIntervals.length; i++) {
      clearInterval(animationIntervals[i]);
    }
    animationIntervals = [];
    stopAllSounds();
  }

  /**
   * Sets game status.
   */
  setGameStatus() {
    let currentTime = new Date().getTime();
    if (this.character.isDead() && this.character.timeOfDeath !== null) {
      if (currentTime - this.character.timeOfDeath > 2000) {
        gameStatus = "lost";
        this.clearAllAnimationsAndSounds();
      }
    }
    if (
      this.endboss.isDead() &&
      currentTime - this.endboss.latestAlive > 2000
    ) {
      gameStatus = "won";
      this.clearAllAnimationsAndSounds();
    }
  }

  /**
   * Stops all action intervals in this world
   */
  stopActions() {
    this.actionIntervals.forEach((id) => {
      clearInterval(id);
    });
    this.actionIntervals = [];
  }
}
