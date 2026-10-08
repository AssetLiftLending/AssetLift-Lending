export type CollisionControl = { left: number; right: number; top: number; bottom: number };
export type CollisionPlacement = { left: number; bottom: number; hidden: boolean };

export function findCollisionFreePosition(
  launcher: { width: number; height: number },
  controls: CollisionControl[],
  viewportWidth: number,
  viewportHeight: number,
  baseBottom = 12,
  step = 12,
  sideInset = 12,
  topClearance = 72,
): CollisionPlacement {
  const maxBottom = Math.max(baseBottom, viewportHeight - launcher.height - topClearance);
  const positions = [sideInset, viewportWidth - sideInset - launcher.width];
  const overlapsAt = (left: number, bottom: number) => {
    const top = viewportHeight - bottom - launcher.height;
    const right = left + launcher.width;
    return controls.some((control) => left < control.right && right > control.left && top < control.bottom && top + launcher.height > control.top);
  };
  for (let bottom = baseBottom; bottom <= maxBottom; bottom += step) {
    for (const left of positions) {
      if (!overlapsAt(left, bottom)) return { left, bottom, hidden: false };
    }
  }
  return { left: positions[1], bottom: baseBottom, hidden: true };
}
