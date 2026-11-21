import { describe, expect, it } from 'vitest'
import { centerOn, clampPan, hotspotAt, isVisible, keyDelta, keyStep, photoSize, step } from './viewer'
import { rooms } from './rooms'

const stage = { w: 1000, h: 500 }
const photo = { w: 1024, h: 768 }

describe('photo size', () => {
  it('covers the stage and keeps the aspect ratio', () => {
    const s = photoSize(stage, photo, 1)
    expect(s.w).toBeCloseTo(1000, 5)
    expect(s.h).toBeCloseTo(750, 5)
    expect(s.w / s.h).toBeCloseTo(1024 / 768, 5)
  })
  it('scales with zoom and never below cover', () => {
    expect(photoSize(stage, photo, 1.5).w).toBeCloseTo(1500, 5)
    expect(photoSize(stage, photo, 0.2)).toEqual(photoSize(stage, photo, 1))
  })
  it('covers a tall stage by height instead', () => {
    const s = photoSize({ w: 400, h: 800 }, photo, 1)
    expect(s.h).toBeCloseTo(800, 5)
    expect(s.w).toBeGreaterThan(400)
  })
})

describe('pan limits', () => {
  const size = photoSize(stage, photo, 1.5) // 1500 x 1125
  it('never shows an empty edge', () => {
    expect(clampPan({ x: 50, y: 50 }, stage, size)).toEqual({ x: 0, y: 0 })
    expect(clampPan({ x: -9999, y: -9999 }, stage, size)).toEqual({ x: -500, y: -625 })
    expect(clampPan({ x: -200, y: -100 }, stage, size)).toEqual({ x: -200, y: -100 })
  })
  it('does not move a photo that exactly fits', () => {
    expect(clampPan({ x: -30, y: 10 }, stage, { w: 1000, h: 500 })).toEqual({ x: 0, y: 0 })
  })
})

describe('hotspots', () => {
  const size = photoSize(stage, photo, 1.5)
  it('moves with the pan', () => {
    const h = { x: 50, y: 50 }
    expect(hotspotAt(h, size, { x: 0, y: 0 })).toEqual({ x: 750, y: 562.5 })
    expect(hotspotAt(h, size, { x: -200, y: -100 })).toEqual({ x: 550, y: 462.5 })
  })
  it('can be centred, within the limits', () => {
    const p = centerOn({ x: 50, y: 50 }, stage, size)
    const pos = hotspotAt({ x: 50, y: 50 }, size, p)
    expect(pos.x).toBeCloseTo(500, 5)
    expect(pos.y).toBeCloseTo(250, 5)
    const edge = centerOn({ x: 2, y: 2 }, stage, size)
    expect(edge).toEqual({ x: 0, y: 0 }) // clamped: cannot centre a hotspot near the corner
  })
  it('knows when a hotspot is on screen', () => {
    expect(isVisible({ x: 500, y: 250 }, stage)).toBe(true)
    expect(isVisible({ x: -5, y: 250 }, stage)).toBe(false)
    expect(isVisible({ x: 500, y: 600 }, stage)).toBe(false)
  })
  it('every room has hotspots inside the photo, with unique ids', () => {
    for (const r of rooms) {
      expect(r.hotspots.length).toBeGreaterThanOrEqual(3)
      expect(new Set(r.hotspots.map((h) => h.id)).size).toBe(r.hotspots.length)
      for (const h of r.hotspots) {
        expect(h.x).toBeGreaterThan(0)
        expect(h.x).toBeLessThan(100)
        expect(h.y).toBeGreaterThan(0)
        expect(h.y).toBeLessThan(100)
      }
    }
  })
})

describe('navigation', () => {
  it('wraps around both ways', () => {
    expect(step(0, -1, 4)).toBe(3)
    expect(step(3, 1, 4)).toBe(0)
    expect(step(1, 1, 4)).toBe(2)
    expect(step(0, 1, 0)).toBe(0)
  })
  it('maps arrow keys to pan changes', () => {
    expect(keyStep(stage, false)).toBe(100)
    expect(keyStep(stage, true)).toBe(300)
    expect(keyDelta('ArrowLeft', stage, false)).toEqual({ x: 100, y: 0 })
    expect(keyDelta('ArrowDown', stage, true)).toEqual({ x: 0, y: -300 })
    expect(keyDelta('a', stage, false)).toBeNull()
  })
})
