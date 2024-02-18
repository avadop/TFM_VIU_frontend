<script setup lang="ts">
import { MDBInput, MDBBtn, MDBRow, MDBCol,MDBIcon } from "mdb-vue-ui-kit"
import { ref } from "vue"
import SubHeader from "../../components/SubHeader.vue"
import axios from 'axios'
import CONSTANTS from '../../constants'
import { useRouter } from "vue-router"

const router = useRouter()

const nif = ref("")
const pais = ref("")
const codigoPostal = ref("")
const correoElectronico = ref("")
const provincia = ref("")
const password = ref("")
const direccion = ref("")
const nombre = ref("")
const apellidos = ref("")
const poblacion = ref("")

const passwordCheck = ref("")

const register = () => {
  if (passwordCheck.value === password.value) {
    const user = {
      nif: nif.value,
      nombre: nombre.value,
      apellidos: apellidos.value,
      codigo_postal: codigoPostal.value,
      pais: pais.value,
      direccion: direccion.value,
      provincia: provincia.value,
      correo_electronico: correoElectronico.value,
      contrasenya: password.value,
      poblacion: poblacion.value,
    };
    axios.post(`${CONSTANTS.USER_API_URL}/new`, user).then(({ data }) => {
      if (data.statusCode === 200) {
        axios.post(`${CONSTANTS.CLIENTES_API_URL}/new`, { id_usuario: user.nif, ...cliente }).then(({ data }) => {
          if(data.statusCode === 200) 
          router.push('/')

        })
      }
    })
    const { contrasenya, ...cliente } = user;

  }
};
</script>

<template>
  <MDBRow start class="justify-content-center mb-5 mt-3">
    <MDBCol col="8">
      <SubHeader>
        <h2 class="m-0">Registro de usuario</h2>
      </SubHeader>
    </MDBCol>
  </MDBRow>
  <form @submit.prevent="register">
    <MDBRow class="justify-content-center px-3">
      <MDBCol col="4" class="pe-3">
        <MDBInput inputGroup type="text" label="NIF" v-model="nif" wrapperClass="mb-4" required>
          <template #prepend>
            <span class="input-group-text"><MDBIcon icon="address-card"></MDBIcon></span>
          </template>
        </MDBInput>

        <MDBInput inputGroup type="text" label="Nombre" v-model="nombre" wrapperClass="mb-4" required>
          <template #prepend>
            <span class="input-group-text"><MDBIcon icon="user"></MDBIcon></span>
          </template>
        </MDBInput>
        <MDBInput inputGroup type="text" label="Apellidos" v-model="apellidos" wrapperClass="mb-4" required>
          <template #prepend>
            <span class="input-group-text"><MDBIcon icon="user"></MDBIcon></span>
          </template>
        </MDBInput>
        <MDBInput inputGroup type="email" label="Correo electrónico" v-model="correoElectronico" wrapperClass="mb-4"
          required>
          <template #prepend>
            <span class="input-group-text"><MDBIcon icon="at"></MDBIcon></span>
          </template>
        </MDBInput>
        <MDBInput inputGroup type="password" label="Contraseña" v-model="password" wrapperClass="mb-4" required>
          <template #prepend>
            <span class="input-group-text"><MDBIcon icon="key"></MDBIcon></span>
          </template>
        </MDBInput>
        <MDBInput inputGroup type="password" label="Confirmar contraseña" v-model="passwordCheck" wrapperClass="mb-4"
          required>
          <template #prepend>
            <span class="input-group-text"><MDBIcon icon="key"></MDBIcon></span>
          </template>
        </MDBInput>
      </MDBCol>
      <MDBCol col="4" class="ps-3">
        <MDBInput inputGroup type="text" label="Dirección" v-model="direccion" wrapperClass="mb-4" required>
          <template #prepend>
            <span class="input-group-text"><MDBIcon icon="home"></MDBIcon></span>
          </template>
        </MDBInput>

        <MDBInput inputGroup type="text" label="Código postal" v-model="codigoPostal" wrapperClass="mb-4" required>
          <template #prepend>
            <span class="input-group-text"><MDBIcon icon="map-marker-alt"></MDBIcon></span>
          </template>
        </MDBInput>

        <MDBInput inputGroup type="text" label="Población" v-model="poblacion" wrapperClass="mb-4" required>
          <template #prepend>
            <span class="input-group-text"><MDBIcon icon="map-marker-alt"></MDBIcon></span>
          </template>
        </MDBInput>

        <MDBInput inputGroup type="text" label="Provincia" v-model="provincia" wrapperClass="mb-4" required>
          <template #prepend>
            <span class="input-group-text"><MDBIcon icon="map-marker-alt"></MDBIcon></span>
          </template>
        </MDBInput>

        <MDBInput inputGroup type="text" label="Pais" v-model="pais" wrapperClass="mb-4" required>
          <template #prepend>
            <span class="input-group-text"><MDBIcon icon="globe"></MDBIcon></span>
          </template>
        </MDBInput>
      </MDBCol>
    </MDBRow>

    <MDBRow class="justify-content-center mt-2">
      <MDBCol col="2">
        <MDBBtn class="mb-4" color="secondary" block @click="() => $router.back()">
          Volver
        </MDBBtn>
      </MDBCol>
      <MDBCol col="6">
        <MDBBtn class="mb-4" color="primary" block type="submit">
          Registrarse
        </MDBBtn>
      </MDBCol>
    </MDBRow>
  </form>
</template>

<style lang="scss" scoped></style>