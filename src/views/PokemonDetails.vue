<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePokemonStore } from '../stores/pokemon'
import { useI18n } from 'vue-i18n'
import PokemonTypes from '../components/PokemonTypes.vue'
import PokemonStats from '../components/PokemonStats.vue'

const route = useRoute()
const router = useRouter()
const store = usePokemonStore()
const { t } = useI18n()

const pokemon = ref(null)
const loading = ref(true)
const evolutionChain = ref([])

const processEvolutionChain = (chain) => {
  const result = []
  const processChain = (node) => {
    result.push({
      name: node.species.name,
      min_level: node.evolution_details[0]?.min_level || null,
      trigger: node.evolution_details[0]?.trigger?.name || null
    })
    if (node.evolves_to.length > 0) {
      node.evolves_to.forEach(evolution => processChain(evolution))
    }
  }
  processChain(chain)
  return result
}

onMounted(async () => {
  try {
    pokemon.value = await store.getPokemonDetails(route.params.id)
    evolutionChain.value = processEvolutionChain(pokemon.value.evolution_chain.chain)
  } catch (error) {
    console.error('Erro ao buscar detalhes:', error)
  } finally {
    loading.value = false
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
  <div v-if="loading" class="text-center py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Carregando...</span>
    </div>
  </div>

  <div v-else-if="pokemon" class="pokemon-details">
    <button @click="router.push('/')" class="btn btn-primary mb-4">
      <i class="bi bi-arrow-left me-2"></i>
      {{ t('pokemon.details.back') }}
    </button>

    <div class="card main-card mb-4">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="pokemon-image-container">
              <img
                :src="pokemon.sprites.other['official-artwork'].front_default"
                class="img-fluid rounded main-image"
                :alt="pokemon.name"
              />
            </div>
            <div 
              class="circle"
              :style="{ backgroundColor: getTypeColor(pokemon.types[0].type.name) }"
            >
            </div>
          </div>
          <div class="col-md-6">
            <h1 class="text-capitalize mb-3 pokemon-title">
              <span class="pokemon-number">#{{ pokemon.id }}</span>
              {{ pokemon.name }}
            </h1>
            <PokemonTypes :types="pokemon.types" class="mb-4" />
            <h3>{{ t('pokemon.details.stats') }}</h3>
            <PokemonStats :stats="pokemon.stats" />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="card h-100 feature-card">
          <div class="card-body">
            <h3 class="section-title">{{ t('pokemon.details.moves') }}</h3>
            <div class="moves-list">
              <span
                v-for="move in pokemon.moves"
                :key="move.move.name"
                class="badge bg-secondary me-2 mb-2 move-badge"
              >
                {{ move.move.name }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6 mb-4">
        <div class="card h-100 feature-card">
          <div class="card-body">
            <h3 class="section-title">{{ t('pokemon.details.games') }}</h3>
            <div class="games-list">
              <span
                v-for="game in pokemon.game_indices"
                :key="game.version.name"
                class="badge bg-info me-2 mb-2 game-badge"
              >
                {{ game.version.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-4 feature-card">
      <div class="card-body">
        <h3 class="section-title">{{ t('pokemon.details.evolution') }}</h3>
        <div class="evolution-chain">
          <div class="evolution-list">
            <div v-for="(evolution, index) in evolutionChain" :key="index" class="evolution-item">
              <div class="pokemon-evolution">
                <span class="text-capitalize evolution-name">{{ evolution.name }}</span>
              </div>
              <div v-if="index < evolutionChain.length - 1" class="evolution-arrow">
                →
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-4 feature-card">
      <div class="card-body">
        <h3 class="section-title">Sprites</h3>
        <div class="sprites-gallery">
          <div class="row g-3">
            <div v-for="(sprite, key) in pokemon.sprites" :key="key" class="col-6 col-md-3">
              <div class="sprite-container">
                <img
                  v-if="sprite && typeof sprite === 'string'"
                  :src="sprite"
                  class="img-fluid rounded sprite-image"
                  :alt="key"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pokemon-details {
  margin-bottom: 2rem;
}

.main-card {
  border: none;
  border-radius: 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to bottom right, #ffffff, #f8f9fa);
  overflow: hidden;
}

.pokemon-image-container {
  background: radial-gradient(circle, rgba(248,249,250,1) 0%, rgba(255,255,255,1) 100%);
  padding: 2rem;
  border-radius: 1rem;
}

.main-image {
  max-height: 300px;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.pokemon-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.pokemon-number {
  color: #6c757d;
  font-weight: 500;
}

.feature-card {
  border: none;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: white;
}

.section-title {
  color: #212529;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 50%;
  height: 3px;
  background: linear-gradient(to right, #2193b0, #6dd5ed);
  border-radius: 2px;
}

.moves-list,
.games-list {
  max-height: 300px;
  overflow-y: auto;
  padding: 1rem;
  background-color: rgba(248, 249, 250, 0.5);
  border-radius: 0.5rem;
}

.move-badge,
.game-badge {
  text-transform: capitalize;
  font-weight: 500;
  padding: 0.5em 1em;
  border-radius: 0.5rem;
}

.evolution-chain {
  padding: 2rem;
  background-color: rgba(248, 249, 250, 0.5);
  border-radius: 1rem;
}

.evolution-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.evolution-item {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.pokemon-evolution {
  background-color: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 150px;
}

.evolution-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #212529;
  display: block;
  margin-bottom: 0.5rem;
}

.evolution-details {
  font-size: 0.9rem;
  color: #6c757d;
  margin-top: 0.5rem;
}

.evolution-arrow {
  font-size: 2rem;
  color: #2193b0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.sprite-container {
  background-color: rgba(248, 249, 250, 0.5);
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
}

.sprite-image {
  max-height: 96px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.circle {
  position: absolute;
  top: -70px;
  left: -70px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  opacity: 0.5;
}

@media (max-width: 768px) {
  .pokemon-title {
    font-size: 2rem;
  }

  .evolution-list {
    gap: 1rem;
  }

  .evolution-item {
    gap: 1rem;
  }

  .pokemon-evolution {
    min-width: 120px;
    padding: 1rem;
  }
}
</style>