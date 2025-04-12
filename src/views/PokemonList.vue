<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '../stores/pokemon'
import { useI18n } from 'vue-i18n'
import PokemonCard from '../components/PokemonCard.vue'
import FloatingButton from '../components/FloatingButton.vue'

const router = useRouter()
const store = usePokemonStore()
const { t } = useI18n()
const { pokemons, loading, filters } = storeToRefs(store)
const loadingTrigger = ref(null)

const filteredPokemons = computed(() => store.filteredPokemons)

onMounted(async () => {
  await store.fetchPokemons()
  
  const observer = new IntersectionObserver(
    async (entries) => {
      const target = entries[0]
      if (target.isIntersecting && !loading.value) {
        await store.fetchPokemons()
      }
    },
    {
      root: null,
      rootMargin: '300px',
      threshold: 0.1
    }
  )

  if (loadingTrigger.value) {
    observer.observe(loadingTrigger.value)
  }
})

const navigateToPokemon = (id) => {
  router.push(`/pokemon/${id}`)
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div class="pokemon-list">
    <h1 class="text-center mb-4 display-4 fw-bold">{{ t('pokemon.list.title') }}</h1>
    
    <div class="filters mb-4">
      <div class="row g-3">
        <div class="col-md-3">
          <div class="form-floating">
            <input
              v-model="filters.name"
              type="text"
              class="form-control"
              id="nameFilter"
              :placeholder="t('pokemon.list.filters.name')"
            />
            <label for="nameFilter">{{ t('pokemon.list.filters.name') }}</label>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-floating">
            <input
              v-model="filters.id"
              type="number"
              class="form-control"
              id="idFilter"
              :placeholder="t('pokemon.list.filters.id')"
            />
            <label for="idFilter">{{ t('pokemon.list.filters.id') }}</label>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-floating">
            <input
              v-model="filters.type"
              type="text"
              class="form-control"
              id="typeFilter"
              :placeholder="t('pokemon.list.filters.type')"
            />
            <label for="typeFilter">{{ t('pokemon.list.filters.type') }}</label>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-floating">
            <input
              v-model="filters.species"
              type="text"
              class="form-control"
              id="speciesFilter"
              :placeholder="t('pokemon.list.filters.species')"
            />
            <label for="speciesFilter">{{ t('pokemon.list.filters.species') }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div v-for="pokemon in filteredPokemons" :key="pokemon.id" class="col-sm-6 col-md-4 col-lg-3">
        <PokemonCard
          :pokemon="pokemon"
          :onClick="() => navigateToPokemon(pokemon.id)"
        />
      </div>
    </div>

    <div ref="loadingTrigger" class="text-center my-4 py-4">
      <div v-if="loading" class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <FloatingButton :onClick="scrollToTop" />
  </div>
</template>

<style scoped>
.pokemon-list {
  padding-bottom: 2rem;
}

.form-floating {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.form-floating input {
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.form-floating input:focus {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
}

.display-4 {
  background: linear-gradient(45deg, #2193b0, #6dd5ed);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>