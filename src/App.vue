<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <a class="skip" href="#main">Μετάβαση στο περιεχόμενο</a>
  <header class="top wrap">
    <RouterLink to="/" class="logo">Δωμάτιο <span>360</span></RouterLink>
    <p class="where">Elia Bay · Θάσος <span class="tag">DEMO CONCEPT</span></p>
  </header>
  <div id="main" tabindex="-1"><RouterView /></div>
  <footer class="foot wrap">
    <p>Φανταστικό demo. Οι φωτογραφίες είναι δημιουργημένες με AI και στατικές: μια πραγματική ξενάγηση 360° θέλει λήψεις 360° από το κάθε δωμάτιο. Σχεδιασμός και υλοποίηση: Βασίλειος Βαρβέρογλου.</p>
    <p><RouterLink to="/privacy">Απόρρητο και cookies</RouterLink></p>
  </footer>
</template>
