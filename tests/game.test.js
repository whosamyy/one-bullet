import test from 'node:test';
import assert from 'node:assert/strict';
import { Game } from '../src/game.js';
const still = { x: 0, y: 0 };

test('one bullet survives repeated fire, lock, wall stop, pickup, and refire', () => {
  const game = new Game(800, 500);
  const originalBullet = game.bullet;
  assert.equal(originalBullet.state, 'held');
  for (let cycle = 0; cycle < 3; cycle++) {
    game.player.x = 400;
    game.player.y = 250;
    assert.equal(game.fire({ x: 800, y: 250 }), true);
    assert.equal(game.fire({ x: 0, y: 250 }), false);
    game.update(0.1, still);
    assert.equal(game.bullet.state, 'traveling');
    assert.equal(game.bullet.retrieve(game.player), false);
    game.update(2, still);
    assert.equal(game.bullet.state, 'stopped');
    assert.equal(game.bullet.x, 794);
    assert.equal(game.fire({ x: 0, y: 250 }), false);
    for (let frame = 0; frame < 100; frame++) game.update(1 / 60, { x: 1, y: 0 });
    assert.equal(game.bullet.state, 'held');
    assert.equal(game.bullet, originalBullet);
  }
});

test('movement is normalized and clamped; diagonal bullet stops at first wall', () => {
  const game = new Game(800, 500);
  game.update(0.1, { x: 1, y: 1 });
  assert.ok(Math.abs(Math.hypot(game.player.x - 400, game.player.y - 250) - 24) < 1e-9);
  game.update(10, { x: -1, y: -1 });
  assert.equal(game.player.x, 14);
  assert.equal(game.player.y, 14);
  game.player.x = 400;
  game.player.y = 250;
  game.fire({ x: 800, y: 500 });
  game.update(10, still);
  assert.equal(game.bullet.state, 'stopped');
  assert.equal(game.bullet.y, 494);
  assert.ok(Math.abs(game.bullet.x - 790.4) < 1e-9);
});
