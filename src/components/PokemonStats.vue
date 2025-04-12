<script setup>
import { defineProps } from 'vue'

defineProps({
  stats: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="stats">
    <div v-for="stat in stats" :key="stat.stat.name" class="stat-item mb-3">
      <div class="d-flex justify-content-between mb-1">
        <span class="text-capitalize stat-name">{{ stat.stat.name }}</span>
        <span class="stat-value">{{ stat.base_stat }}</span>
      </div>
      <div class="progress" style="height: 8px;">
        <div
          class="progress-bar"
          role="progressbar"
          :style="{ 
            width: `${(stat.base_stat / 255) * 100}%`,
            backgroundColor: `hsl(${(stat.base_stat / 255) * 120}, 70%, 45%)`
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat-item {
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

.stat-name {
  font-weight: 500;
  color: #495057;
}

.stat-value {
  font-weight: 600;
  color: #212529;
}
</style>