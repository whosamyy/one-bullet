import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePlayerPosition } from '../src/gameLogic.js';
import { advanceBullet, canRetrieveBullet } from '../src/gameLogic.js';

test("player moves right correctly", () => {
  const result = calculatePlayerPosition(
    { x: 100, y: 100 },
    { x: 1, y: 0 },
    240,
    10,
    0.1,
    800,
    600
  );

  assert.deepEqual(result, { x: 124, y: 100 });
});

test('zero direction leaves an in-bounds player stationary', () => {
  const result = calculatePlayerPosition(
    { x: 100, y: 200 }, { x: 0, y: 0 }, 240, 14, 1, 800, 500
  );
  assert.deepEqual(result, { x: 100, y: 200 });
});

test('diagonal movement has the same total speed as straight movement', () => {
  const result = calculatePlayerPosition(
    { x: 100, y: 100 }, { x: 1, y: 1 }, 240, 14, 0.1, 800, 500
  );
  const expectedCoordinate = 100 + 24 / Math.sqrt(2);
  assert.ok(Math.abs(result.x - expectedCoordinate) < 1e-9);
  assert.ok(Math.abs(result.y - expectedCoordinate) < 1e-9);
  assert.ok(Math.abs(Math.hypot(result.x - 100, result.y - 100) - 24) < 1e-9);
});

test('large movements clamp to all four arena boundaries using player radius', () => {
  assert.deepEqual(
    calculatePlayerPosition({ x: 400, y: 250 }, { x: -1, y: -1 }, 240, 14, 10, 800, 500),
    { x: 14, y: 14 }
  );
  assert.deepEqual(
    calculatePlayerPosition({ x: 400, y: 250 }, { x: 1, y: 1 }, 240, 14, 10, 800, 500),
    { x: 786, y: 486 }
  );
});

test('traveling bullet advances without stopping before a wall', () => {
  const result = advanceBullet(
    { state: 'traveling', x: 100, y: 100, velocityX: 300, velocityY: -400, radius: 6 },
    0.1, 800, 500
  );
  assert.deepEqual(result, {
    state: 'traveling', x: 130, y: 60, velocityX: 300, velocityY: -400,
  });
});

test('diagonal bullet stops at the first wall without continuing along the other axis', () => {
  const result = advanceBullet(
    { state: 'traveling', x: 400, y: 250, velocityX: 400, velocityY: 250, radius: 6 },
    2, 800, 500
  );
  assert.equal(result.state, 'stopped');
  assert.ok(Math.abs(result.x - 790.4) < 1e-9);
  assert.equal(result.y, 494);
  assert.equal(result.velocityX, 0);
  assert.equal(result.velocityY, 0);
});

test('bullet stops when it reaches a wall exactly at the end of a frame', () => {
  const result = advanceBullet(
    { state: 'traveling', x: 694, y: 250, velocityX: 100, velocityY: 0, radius: 6 },
    1, 800, 500
  );
  assert.deepEqual(result, {
    state: 'stopped', x: 794, y: 250, velocityX: 0, velocityY: 0,
  });
});

test('stopped bullet can be retrieved when the circles touch exactly', () => {
  assert.equal(canRetrieveBullet(
    { state: 'stopped', x: 112, y: 116, radius: 6 },
    { x: 100, y: 100, radius: 14 }
  ), true);
});

test('stopped bullet just outside pickup range cannot be retrieved', () => {
  assert.equal(canRetrieveBullet(
    { state: 'stopped', x: 120.001, y: 100, radius: 6 },
    { x: 100, y: 100, radius: 14 }
  ), false);
});

test('traveling bullet cannot be retrieved even with coincident centers', () => {
  assert.equal(canRetrieveBullet(
    { state: 'traveling', x: 100, y: 100, radius: 6 },
    { x: 100, y: 100, radius: 14 }
  ), false);
});
