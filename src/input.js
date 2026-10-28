export class Input {
  constructor(canvas, onFire) {
    this.keys = new Set();
    const movementKeys = new Set(['w', 'a', 's', 'd', 'arrowup', 'arrowleft', 'arrowdown', 'arrowright']);
    window.addEventListener('keydown', event => {
      const key = event.key.toLowerCase();
      if (movementKeys.has(key)) {
        event.preventDefault();
        this.keys.add(key);
      }
    });
    window.addEventListener('keyup', event => this.keys.delete(event.key.toLowerCase()));
    window.addEventListener('blur', () => this.keys.clear());
    canvas.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      canvas.focus({ preventScroll: true });
      const bounds = canvas.getBoundingClientRect();
      // Map the displayed canvas back to its fixed arena coordinates.
      onFire({
        x: (event.clientX - bounds.left - canvas.clientLeft) * canvas.width / canvas.clientWidth,
        y: (event.clientY - bounds.top - canvas.clientTop) * canvas.height / canvas.clientHeight,
      });
    });
  }

  direction() {
    const down = (...keys) => keys.some(key => this.keys.has(key));
    return {
      x: Number(down('d', 'arrowright')) - Number(down('a', 'arrowleft')),
      y: Number(down('s', 'arrowdown')) - Number(down('w', 'arrowup')),
    };
  }
}
