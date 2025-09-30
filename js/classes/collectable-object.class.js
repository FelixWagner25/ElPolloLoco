class CollectableObject extends MovableObject {
  constructor() {
    super();
    this.x = 100 + Math.random() * 360;
    this.y = 360;
  }
}
