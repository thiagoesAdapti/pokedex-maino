import { defineStore } from 'pinia'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
    loading: false,
    error: null,
    filters: {
      name: '',
      id: '',
      type: '',
      species: ''
    },
    offset: 0,
    limit: 20
  }),

  actions: {
    async fetchPokemons() {
      try {
        this.loading = true
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`)
        const newPokemons = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url)
            return details.data
          })
        )
        this.pokemons.push(...newPokemons)
        this.offset += this.limit
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async getPokemonDetails(id) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const species = await axios.get(response.data.species.url)
        const evolutionChain = await axios.get(species.data.evolution_chain.url)
        return {
          ...response.data,
          species: species.data,
          evolution_chain: evolutionChain.data
        }
      } catch (error) {
        throw new Error(error.message)
      }
    },

    setFilter(type, value) {
      this.filters[type] = value
    },

    resetFilters() {
      this.filters = {
        name: '',
        id: '',
        type: '',
        species: ''
      }
    }
  },

  getters: {
    filteredPokemons: (state) => {
      return state.pokemons.filter(pokemon => {
        const nameMatch = pokemon.name.toLowerCase().includes(state.filters.name.toLowerCase())
        const idMatch = !state.filters.id || pokemon.id.toString().includes(state.filters.id)
        const typeMatch = !state.filters.type || pokemon.types.some(t => t.type.name.toLowerCase().includes(state.filters.type.toLowerCase()))
        const speciesMatch = !state.filters.species || pokemon.species.name.toLowerCase().includes(state.filters.species.toLowerCase())
        return nameMatch && idMatch && typeMatch && speciesMatch
      })
    }
  }
})