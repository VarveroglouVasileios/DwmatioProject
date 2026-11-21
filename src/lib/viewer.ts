/** Geometry for a draggable room viewer: a zoomed photo inside a fixed stage, with hotspots pinned to the photo. Pure functions. */

export interface Size { w: number; h: number }
export interface Pan { x: number; y: number }
export interface Hotspot { id: string; x: number; y: number; label: string; title: string; text: string }

/** Size of the photo when it covers the stage (like object-fit: cover), multiplied by the zoom factor (>= 1). */
export function photoSize(stage: Size, photo: Size, zoom: number): Size {
  const z = Math.max(1, zoom)
  const scale = Math.max(stage.w / photo.w, stage.h / photo.h) * z
  return { w: photo.w * scale, h: photo.h * scale }
}

/** Pan is the photo's top-left corner in stage pixels. It can never reveal an empty edge. */
export function clampPan(p: Pan, stage: Size, size: Size): Pan {
  const minX = Math.min(0, stage.w - size.w)
  const minY = Math.min(0, stage.h - size.h)
  return { x: Math.min(0, Math.max(minX, p.x)), y: Math.min(0, Math.max(minY, p.y)) }
}

/** Hotspot position on screen, for x and y given as percentages of the photo. */
export const hotspotAt = (h: Pick<Hotspot, 'x' | 'y'>, size: Size, pan: Pan): Pan => ({ x: pan.x + (h.x / 100) * size.w, y: pan.y + (h.y / 100) * size.h })

/** The pan that puts a hotspot in the middle of the stage (clamped). */
export function centerOn(h: Pick<Hotspot, 'x' | 'y'>, stage: Size, size: Size): Pan {
  return clampPan({ x: stage.w / 2 - (h.x / 100) * size.w, y: stage.h / 2 - (h.y / 100) * size.h }, stage, size)
}

export const isVisible = (pos: Pan, stage: Size, margin = 12): boolean => pos.x >= margin && pos.y >= margin && pos.x <= stage.w - margin && pos.y <= stage.h - margin

/** Next or previous index, wrapping around the ends. */
export const step = (i: number, delta: number, count: number): number => (count <= 0 ? 0 : (((i + delta) % count) + count) % count)

/** Keyboard step in pixels: a tenth of the stage, larger with shift. */
export const keyStep = (stage: Size, big: boolean): number => Math.round((big ? 0.3 : 0.1) * stage.w)

/** Which way a key pans the photo. Returns the change to apply to pan, or null for other keys. */
export function keyDelta(key: string, stage: Size, shift: boolean): Pan | null {
  const s = keyStep(stage, shift)
  switch (key) {
    case 'ArrowLeft': return { x: s, y: 0 } // moving the view left moves the photo right
    case 'ArrowRight': return { x: -s, y: 0 }
    case 'ArrowUp': return { x: 0, y: s }
    case 'ArrowDown': return { x: 0, y: -s }
    default: return null
  }
}
