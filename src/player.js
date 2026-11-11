import { calculatePlayerPosition } from './gameLogic.js';

export class Player {
  constructor(width, height) {
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 14;
    this.speed = 240;
  }

  update(seconds, direction, width, height) {
    const position = calculatePlayerPosition(this, direction, this.speed, this.radius, seconds, width, height);
    this.x = position.x;
    this.y = position.y;
  }
}
