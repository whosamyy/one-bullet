export function drawGame(context, game) {
  context.clearRect(0, 0, game.width, game.height);
  const { player, bullet } = game;
  context.fillStyle = '#80d8ff';
  context.beginPath();
  context.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  context.fill();

  const bulletX = bullet.state === 'held' ? player.x : bullet.x;
  const bulletY = bullet.state === 'held' ? player.y : bullet.y;
  context.fillStyle = '#ffdc75';
  context.beginPath();
  context.arc(bulletX, bulletY, bullet.radius, 0, Math.PI * 2);
  context.fill();
}
