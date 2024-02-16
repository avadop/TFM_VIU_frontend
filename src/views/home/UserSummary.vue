<script setup lang="ts">
import { MDBInput, MDBBtn, MDBRow, MDBCol } from "mdb-vue-ui-kit";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import SubHeader from "../../components/SubHeader.vue";

const store = useStore()
const router = useRouter()
const userName = ref("");

onMounted(() => {
  userName.value = store.getters.getLoggedUser
})

</script>

<template>
  <MDBRow start class="justify-content-center mb-5 mt-3">
    <MDBCol col="10">
      <SubHeader>
        <h2>Bienvenid@, {{userName}} </h2>
        <span>Aquí tienes un resumen de tu empresa</span>
      </SubHeader>
    </MDBCol>
  </MDBRow>
</template>

<style lang="sass" scoped>
</style>