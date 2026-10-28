import { Game } from './game.js';
import { Input } from './input.js';
import { drawGame } from './render.js';

const canvas = document.querySelector('#arena');
const context = canvas.getContext('2d');
const status = document.querySelector('#status');
const game = new Game(canvas.width, canvas.height);
const input = new Input(canvas, target => game.fire(target));
document.querySelector('#controls').textContent = 'Move: WASD or arrow keys. Aim and fire: left click. Touch the stopped yellow bullet to retrieve it.';
const messages = {
  held: 'Bullet held — ready to fire.',
  traveling: 'Bullet traveling — shooting locked.',
  stopped: 'Bullet stopped — move to the yellow bullet to retrieve it.',
};
let previousTime;
function frame(time) {
  // Avoid a large movement jump after switching back to this tab.
  const seconds = previousTime === undefined ? 0 : Math.min((time - previousTime) / 1000, 0.05);
  previousTime = time;
  game.update(seconds, input.direction());
  drawGame(context, game);
  const message = messages[game.bullet.state];
  if (status.textContent !== message) status.textContent = message;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
