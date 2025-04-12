<script setup>
import { defineProps } from 'vue'

defineProps({
  types: {
    type: Array,
    required: true
  }
})

const getTypeColor = (type) => {
  const colors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  }
  return colors[type] || '#777'
}
</script>

<template>
  <div class="d-flex justify-content-center gap-2 flex-wrap">
    <span
      v-for="type in types"
      :key="type.type.name"
      class="badge type-badge"
      :style="{ backgroundColor: getTypeColor(type.type.name) }"
    >
      {{ type.type.name }}
    </span>
  </div>
</template>

<style scoped>
.type-badge {
  padding: 0.5em 1.2em;
  font-size: 1rem;
  border-radius: 2rem;
  text-transform: capitalize;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>