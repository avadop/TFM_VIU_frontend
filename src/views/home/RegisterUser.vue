<script setup lang="ts">
import { MDBInput, MDBBtn, MDBRow, MDBCol } from "mdb-vue-ui-kit";
import { ref } from "vue";
import SubHeader from "../../components/SubHeader.vue";

const user = ref({
  nif: "",
  password: "",
  pais: "",
  codigoPostal: "",
  correoElectronico: "",
  provincia: "",
  contrasenya: "",
  direccion: "",
  nombre: "",
  apellidos: "",
});

const passwordCheck = ref("")

const register = () => {
  if(passwordCheck.value === user.value.contrasenya) {
  console.log("user", user.value);
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
  <MDBRow  class="justify-content-center px-3">
    <MDBCol col="4" class="pe-3">
      <MDBInput inputGroup type="text" label="NIF" v-model="user.nif" wrapperClass="mb-4" >
        <template #prepend>
          <span class="input-group-text" id="basic-addon1">@</span>
        </template>
      </MDBInput>

      <MDBInput
        inputGroup
        type="text"
        label="Nombre"
        v-model="user.nombre"
        wrapperClass="mb-4"
      >
        <template #prepend>
          <span class="input-group-text" id="basic-addon1">@</span>
        </template>
      </MDBInput>
      <MDBInput
        inputGroup
        type="text"
        label="Apellidos"
        v-model="user.apellidos"
        wrapperClass="mb-4"
      >
        <template #prepend>
          <span class="input-group-text" id="basic-addon1">@</span>
        </template>
      </MDBInput>
      <MDBInput
        inputGroup
        type="email"
        label="Correo electrónico"
        v-model="user.correoElectronico"
        wrapperClass="mb-4"
      >
        <template #prepend>
          <span class="input-group-text" id="basic-addon1">@</span>
        </template>
      </MDBInput>
      <MDBInput
        inputGroup
        type="password"
        label="Contraseña"
        v-model="user.contrasenya"
        wrapperClass="mb-4"
      >
        <template #prepend>
          <span class="input-group-text" id="basic-addon1">@</span>
        </template>
      </MDBInput>
      <MDBInput
        inputGroup
        type="password"
        label="Confirmar contraseña"
        v-model="passwordCheck"
        wrapperClass="mb-4"
      >
        <template #prepend>
          <span class="input-group-text" id="basic-addon1">@</span>
        </template>
      </MDBInput>
    </MDBCol>
    <MDBCol col="4" class="ps-3">
      <MDBInput
        inputGroup
        type="text"
        label="Dirección"
        v-model="user.direccion"
        wrapperClass="mb-4"
      >
        <template #prepend>
          <span class="input-group-text" id="basic-addon1">@</span>
        </template>
      </MDBInput>
      
      <MDBInput
        inputGroup
        type="text"
        label="Código postal"
        v-model="user.codigo_postal"
        wrapperClass="mb-4"
      >
        <template #prepend>
          <span class="input-group-text" id="basic-addon1">@</span>
        </template>
      </MDBInput>
      
      <MDBInput
        inputGroup
        type="text"
        label="Población"
        v-model="user.poblacion"
        wrapperClass="mb-4"
      >
        <template #prepend>
          <span class="input-group-text" id="basic-addon1">@</span>
        </template>
      </MDBInput>
      
      <MDBInput
        inputGroup
        type="text"
        label="Provincia"
        v-model="user.provincia"
        wrapperClass="mb-4"
      >
        <template #prepend>
          <span class="input-group-text" id="basic-addon1">@</span>
        </template>
      </MDBInput>
      
      <MDBInput
        inputGroup type="text" label="Pais" v-model="user.pais" wrapperClass="mb-4" >
        <template #prepend>
          <span class="input-group-text" id="basic-addon1">@</span>
        </template>
      </MDBInput>
        
    </MDBCol>
  </MDBRow>

  <MDBRow class="justify-content-center mt-2">
    <MDBCol col="2">
      <MDBBtn
        class="mb-4 "
        color="secondary"
        block
        @click="() => $router.back()"
      >
        Volver
      </MDBBtn>
    </MDBCol>
    <MDBCol col="6">
      <MDBBtn class="mb-4" color="primary" block @click="register">
        Registrarse
      </MDBBtn>
    </MDBCol>
  </MDBRow>
</template>

<style lang="scss" scoped>
</style>