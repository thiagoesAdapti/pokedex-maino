<script setup>
import { defineProps } from 'vue'

defineProps({
  onClick: {
    type: Function,
    required: true
  },
  icon: {
    type: String,
    default: 'arrow-up'
  }
})
</script>

<template>
  <button 
    class="floating-button"
    @click="onClick"
    aria-label="Voltar ao topo"
  >
    <i :class="`bi bi-${icon}`"></i>
  </button>
</template>

<style scoped>
.floating-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: linear-gradient(45deg, #2193b0, #6dd5ed);
  border: none;
  color: white;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 1000;
}

.floating-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.floating-button:active {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .floating-button {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 3rem;
    height: 3rem;
    font-size: 1rem;
  }
}
</style>