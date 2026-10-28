import { Player } from './player.js';
import { Bullet } from './bullet.js';

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(width, height);
    this.bullet = new Bullet();
    // TODO: Add continuously spawning, chasing enemies and bullet-hit removal.
    // TODO: Settle health/damage rules before adding health and game over.
    // TODO: Settle points per kill before adding scoring.
  }

  update(seconds, direction) {
    this.player.update(seconds, direction, this.width, this.height);
    this.bullet.update(seconds, this.width, this.height);
    this.bullet.retrieve(this.player);
  }

  fire(target) {
    return this.bullet.fire(this.player, target);
  }
}
