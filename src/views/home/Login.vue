<script setup lang="ts">
import { MDBInput, MDBBtn, MDBRow, MDBCol, MDBIcon } from "mdb-vue-ui-kit";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import SubHeader from "../../components/SubHeader.vue";
import axios from 'axios'
import CONSTANTS from '../../constants'

const store = useStore()
const router = useRouter()

const userId = ref("")
const password = ref("")

const login = () => {
   axios.post(`${CONSTANTS.USER_API_URL}/login`, {
       nif: userId.value,
       contrasenya: password.value
   }).then(({data: response}) => {
     if(response.statusCode === 200) {
       store.commit('saveLoggedUser', response.data)
       router.push('/summary')
     }

   }).catch(e => console.log("error", e))
};

</script>

<template>
  <MDBRow start class="justify-content-center mb-5 mt-3">
    <MDBCol col="8">
      <SubHeader>
        <h2>¡Bienvenid@!</h2>
        <span>Para empezar a usar la aplicación, por favor inicia sesión</span>
      </SubHeader>
    </MDBCol>
  </MDBRow>
  <MDBRow class="justify-content-center" tag="form" @submit.prevent="login">
    <MDBCol md="4">
      <MDBBtn class="mb-3" color="secondary" block @click="() => $router.push('/registration')">
        Registrarse
      </MDBBtn>
      <div class="d-flex flex-row w-100 mb-3">
        <hr class="w-100" />
        <span class="ms-4 me-4"> o </span>
        <hr class="w-100" />
      </div>
      <MDBInput inputGroup label="Usuario" v-model="userId" wrapperClass="mb-4" required>
        <template #prepend>
          <span class="input-group-text" id="pais-input"><MDBIcon icon="user"></MDBIcon></span>
        </template>
      </MDBInput>
      <MDBInput inputGroup type="password" label="Contraseña" v-model="password" wrapperClass="mb-4" required>
        <template #prepend>
          <span class="input-group-text" id="pais-input"><MDBIcon icon="key"></MDBIcon></span>
        </template>
      </MDBInput>
      <MDBBtn class="mb-4 mt-2" color="primary" block type="submit">
        Iniciar sesión
      </MDBBtn>
    </MDBCol>
  </MDBRow>
</template>

<style lang="scss" scoped></style>