export function calculatePlayerPosition(position, direction, speed, radius, seconds, width, height) {
  let { x, y } = position;
  const length = Math.hypot(direction.x, direction.y);
  if (length > 0) {
    x += direction.x / length * speed * seconds;
    y += direction.y / length * speed * seconds;
  }
  x = Math.max(radius, Math.min(width - radius, x));
  y = Math.max(radius, Math.min(height - radius, y));
  return { x, y };
}

export function advanceBullet(bullet, seconds, width, height) {
  let { state, x, y, velocityX, velocityY } = bullet;
  const { radius } = bullet;
  if (state !== 'traveling') return { state, x, y, velocityX, velocityY };
  // Stop at the first wall, including on diagonal shots.
  const timeToX = velocityX > 0
    ? (width - radius - x) / velocityX
    : velocityX < 0 ? (radius - x) / velocityX : Infinity;
  const timeToY = velocityY > 0
    ? (height - radius - y) / velocityY
    : velocityY < 0 ? (radius - y) / velocityY : Infinity;
  const travelTime = Math.min(seconds, timeToX, timeToY);
  x += velocityX * travelTime;
  y += velocityY * travelTime;
  if (travelTime < seconds || timeToX === seconds || timeToY === seconds) {
    state = 'stopped';
    velocityX = 0;
    velocityY = 0;
  }
  return { state, x, y, velocityX, velocityY };
}

export function canRetrieveBullet(bullet, player) {
  if (bullet.state !== 'stopped') return false;
  if (Math.hypot(player.x - bullet.x, player.y - bullet.y) > player.radius + bullet.radius) return false;
  return true;
}
