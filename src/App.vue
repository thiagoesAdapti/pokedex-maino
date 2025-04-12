<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const changeLanguage = (lang) => {
  locale.value = lang
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img src="../public/pokebola.png" height="26" alt="">
        <span class="ms-2">Pokedex</span>
      </router-link>
      <div class="ms-auto">
        <div class="btn-group">
          <button @click="changeLanguage('pt')" class="btn" :class="locale === 'pt' ? 'btn-primary' : 'btn-outline-primary'">PT</button>
          <button @click="changeLanguage('en')" class="btn" :class="locale === 'en' ? 'btn-primary' : 'btn-outline-primary'">EN</button>
          <button @click="changeLanguage('es')" class="btn" :class="locale === 'es' ? 'btn-primary' : 'btn-outline-primary'">ES</button>
        </div>
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style>
.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.btn-group .btn {
  padding: 0.375rem 1rem;
}
</style>