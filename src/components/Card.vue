<script setup lang="ts">
import { MDBIcon } from 'mdb-vue-ui-kit';
</script>

<template>
  <div class="w-100 sub-header px-4 py-3">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .sub-header {
    border:2px solid antiquewhite;
    border-radius: 0.5em;
  }
</style>