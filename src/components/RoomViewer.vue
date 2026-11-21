<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { Room } from '@/lib/rooms'
import { centerOn, clampPan, hotspotAt, keyDelta, photoSize, step, type Pan, type Size } from '@/lib/viewer'

const props = defineProps<{ room: Room }>()
const base = import.meta.env.BASE_URL
const ZOOM = 1.45

const stageEl = ref<HTMLElement>()
const stage = ref<Size>({ w: 1000, h: 520 })
const pan = ref<Pan>({ x: 0, y: 0 })
const active = ref(0)
const hint = ref(true)
const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

const size = computed(() => photoSize(stage.value, { w: props.room.width, h: props.room.height }, ZOOM))
const spots = computed(() => props.room.hotspots.map((h, i) => ({ h, i, pos: hotspotAt(h, size.value, pan.value) })))
const current = computed(() => props.room.hotspots[active.value])

const set = (p: Pan): void => {
  pan.value = clampPan(p, stage.value, size.value)
}
const goTo = (i: number): void => {
  active.value = step(i, 0, props.room.hotspots.length)
  animate = true
  set(centerOn(props.room.hotspots[active.value], stage.value, size.value))
}
let animate = false
// --- drag ---------------------------------------------------------------------
let drag: { x: number; y: number; start: Pan } | null = null
const dragging = ref(false)
const down = (e: PointerEvent): void => {
  if ((e.target as HTMLElement).closest('button')) return
  drag = { x: e.clientX, y: e.clientY, start: { ...pan.value } }
  dragging.value = true
  animate = false
  hint.value = false
  stageEl.value?.setPointerCapture(e.pointerId)
}
const move = (e: PointerEvent): void => {
  if (drag) set({ x: drag.start.x + e.clientX - drag.x, y: drag.start.y + e.clientY - drag.y })
}
const up = (): void => {
  drag = null
  dragging.value = false
}
const key = (e: KeyboardEvent): void => {
  const d = keyDelta(e.key, stage.value, e.shiftKey)
  if (!d) return
  e.preventDefault()
  animate = true
  hint.value = false
  set({ x: pan.value.x + d.x, y: pan.value.y + d.y })
}

let ro: ResizeObserver | undefined
const measure = (): void => {
  const r = stageEl.value?.getBoundingClientRect()
  if (!r) return
  stage.value = { w: r.width, h: r.height }
  set(pan.value)
}
onMounted(() => {
  measure()
  set(centerOn(props.room.hotspots[0], stage.value, size.value))
  if (typeof ResizeObserver !== 'undefined' && stageEl.value) {
    ro = new ResizeObserver(measure)
    ro.observe(stageEl.value)
  }
})
onBeforeUnmount(() => ro?.disconnect())
watch(() => props.room.id, async () => {
  active.value = 0
  animate = false
  await nextTick()
  set(centerOn(props.room.hotspots[0], stage.value, size.value))
})
const smooth = computed(() => animate && !dragging.value && !reduced)
</script>

<template>
  <div class="viewer">
    <div
      ref="stageEl" class="stage" :class="{ drag: dragging }" tabindex="0" role="group" :aria-label="`${room.name}: σύρετε ή χρησιμοποιήστε τα βέλη για να κινηθείτε στη φωτογραφία`"
      @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="up" @keydown="key"
    >
      <img :src="`${base}images/${room.image}.webp`" :alt="room.alt" :width="room.width" :height="room.height" draggable="false" class="photo" :class="{ smooth }" :style="{ width: size.w + 'px', height: size.h + 'px', transform: `translate(${pan.x}px, ${pan.y}px)` }" />
      <button
        v-for="s in spots" :key="s.h.id" type="button" class="hs" :class="{ on: s.i === active, smooth }" :style="{ transform: `translate(${s.pos.x}px, ${s.pos.y}px)` }"
        :aria-label="`${s.h.label}: σημείο ${s.i + 1} από ${spots.length}`" :aria-pressed="s.i === active" @click="goTo(s.i)"
      ><span>{{ s.i + 1 }}</span></button>
      <p v-if="hint" class="hintbar" aria-hidden="true">Σύρετε για περιστροφή</p>
    </div>
    <div class="info" aria-live="polite">
      <p class="kick">ΣΗΜΕΙΟ {{ active + 1 }} ΑΠΟ {{ room.hotspots.length }}</p>
      <h2>{{ current.title }}</h2>
      <p>{{ current.text }}</p>
      <div class="pn"><button type="button" @click="goTo(active - 1)">◀ προηγούμενο</button><button type="button" @click="goTo(active + 1)">επόμενο ▶</button></div>
    </div>
  </div>
</template>
