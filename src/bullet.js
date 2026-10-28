export class Bullet {
  constructor() {
    this.state = 'held';
    this.radius = 6;
    this.speed = 550;
    this.x = 0;
    this.y = 0;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  fire(player, target) {
    if (this.state !== 'held') return false;
    const dx = target.x - player.x;
    const dy = target.y - player.y;
    const distance = Math.hypot(dx, dy);
    if (distance === 0) return false;
    this.x = player.x;
    this.y = player.y;
    this.velocityX = dx / distance * this.speed;
    this.velocityY = dy / distance * this.speed;
    this.state = 'traveling';
    return true;
  }

  update(seconds, width, height) {
    if (this.state !== 'traveling') return;
    // Stop at the first wall, including on diagonal shots.
    const timeToX = this.velocityX > 0
      ? (width - this.radius - this.x) / this.velocityX
      : this.velocityX < 0 ? (this.radius - this.x) / this.velocityX : Infinity;
    const timeToY = this.velocityY > 0
      ? (height - this.radius - this.y) / this.velocityY
      : this.velocityY < 0 ? (this.radius - this.y) / this.velocityY : Infinity;
    const travelTime = Math.min(seconds, timeToX, timeToY);
    this.x += this.velocityX * travelTime;
    this.y += this.velocityY * travelTime;
    if (travelTime < seconds || timeToX === seconds || timeToY === seconds) {
      this.state = 'stopped';
      this.velocityX = 0;
      this.velocityY = 0;
    }
  }

  retrieve(player) {
    if (this.state !== 'stopped') return false;
    if (Math.hypot(player.x - this.x, player.y - this.y) > player.radius + this.radius) return false;
    this.state = 'held';
    return true;
  }
}
