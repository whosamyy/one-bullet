export class Player {
  constructor(width, height) {
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 14;
    this.speed = 240;
  }

  update(seconds, direction, width, height) {
    const length = Math.hypot(direction.x, direction.y);
    if (length > 0) {
      this.x += direction.x / length * this.speed * seconds;
      this.y += direction.y / length * this.speed * seconds;
    }
    this.x = Math.max(this.radius, Math.min(width - this.radius, this.x));
    this.y = Math.max(this.radius, Math.min(height - this.radius, this.y));
  }
}
