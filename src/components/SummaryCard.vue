<script setup lang="ts">
import { MDBIcon } from 'mdb-vue-ui-kit';

import Card from './Card.vue'

const props = defineProps(["title", "amount", "icon"])

const formatAmount = (amount: any) => {
  return amount ? props.amount.toFixed(2).replace('.',','): ""
}
</script>

<template>
  <Card>
    <div class="d-flex justify-content-between align-items-center">
      <h4>{{ props.title }}</h4>
      <MDBIcon :icon="props.icon" size="2x"></MDBIcon>
    </div>
    <h3>{{ formatAmount(props.amount)}} €</h3>
  </Card>
</template>

<style lang="scss" scoped>
</style>