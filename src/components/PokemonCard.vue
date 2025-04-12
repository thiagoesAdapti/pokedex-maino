<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  },
  onClick: {
    type: Function,
    default: () => {}
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
  <div class="card h-100 pokemon-card" @click="onClick">
    <div class="card-img-container">
      <div 
        class="circle"
        :style="{ backgroundColor: getTypeColor(pokemon.types[0].type.name) }"
      >
      </div>
      <img
        :src="pokemon.sprites.other['official-artwork'].front_default"
        class="card-img-top p-3"
        :alt="pokemon.name"
      />
    </div>
    <div class="card-body">
      <h5 class="card-title text-capitalize mb-3">
        <span class="pokemon-id">#{{ pokemon.id }}</span>
        {{ pokemon.name }}
      </h5>
      <div class="d-flex gap-2 justify-content-center">
        <span
          v-for="type in pokemon.types"
          :key="type.type.name"
          class="badge"
          :style="{ backgroundColor: getTypeColor(type.type.name) }"
        >
          {{ type.type.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.circle {
  position: absolute;
  top: -70px;
  left: -70px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  opacity: 0.5;
}

.pokemon-card {
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
}

.pokemon-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 16px rgba(0, 0, 0, 0.1);
}

.card-img-container {
  background: radial-gradient(circle, rgba(248,249,250,1) 0%, rgba(255,255,255,1) 100%);
  padding: 1rem;
}

.pokemon-card img {
  max-height: 200px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.pokemon-card:hover img {
  transform: scale(1.05);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.pokemon-id {
  color: #6c757d;
  font-weight: 500;
  margin-right: 0.5rem;
}

.badge {
  padding: 0.5em 1em;
  font-size: 0.8rem;
  text-transform: capitalize;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>