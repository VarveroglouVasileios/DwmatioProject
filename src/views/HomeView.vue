<script setup lang="ts">
import { computed, ref } from 'vue'
import RoomViewer from '@/components/RoomViewer.vue'
import { rooms } from '@/lib/rooms'

const idx = ref(0)
const room = computed(() => rooms[idx.value])
const base = import.meta.env.BASE_URL
</script>

<template>
  <main class="wrap">
    <h1>Δείτε το δωμάτιο <b>πριν το κλείσετε.</b></h1>
    <RoomViewer :room="room" :key="room.id" />

    <ul class="thumbs" aria-label="Επιλογή δωματίου">
      <li v-for="(r, i) in rooms" :key="r.id">
        <button type="button" class="th" :class="{ on: i === idx }" :aria-pressed="i === idx" @click="idx = i">
          <img :src="`${base}images/${r.image}.webp`" alt="" width="320" height="200" loading="lazy" /><span>{{ r.name }}</span>
        </button>
      </li>
    </ul>

    <section class="facts" aria-label="Στοιχεία δωματίου">
      <dl>
        <div><dt>ΕΠΙΦΑΝΕΙΑ</dt><dd>{{ room.m2 }} m²</dd></div>
        <div><dt>ΑΤΟΜΑ</dt><dd>{{ room.guests }}</dd></div>
        <div v-if="room.from"><dt>ΑΠΟ</dt><dd>{{ room.from }} €<small> /νύχτα, ενδεικτικά</small></dd></div>
      </dl>
      <a class="cta" href="https://varveroglouvasileios.github.io/HotelProject/" rel="noopener">Έλεγχος διαθεσιμότητας →</a>
    </section>
  </main>
</template>
