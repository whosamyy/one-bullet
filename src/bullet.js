import { advanceBullet, canRetrieveBullet } from './gameLogic.js';

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
    Object.assign(this, advanceBullet(this, seconds, width, height));
  }

  retrieve(player) {
    if (!canRetrieveBullet(this, player)) return false;
    this.state = 'held';
    return true;
  }
}
