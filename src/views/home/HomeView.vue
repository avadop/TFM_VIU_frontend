<script setup lang="ts">
import {useStore} from 'vuex'
import {computed } from 'vue'

const store = useStore()
const loggedUser = computed(() => store.getters.getLoggedUser)
console.log("loggedUser", loggedUser.value)
</script>

<template>
  <main class="home-view">
    <p>HOME</p>
  </main>
</template>

<style lang="scss" scoped src="./home-view.scss">

</style>