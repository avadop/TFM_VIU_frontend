<script setup lang="ts">
import {
  MDBInput,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBModalTitle,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
} from "mdb-vue-ui-kit";
import { ref } from "vue";
import SubHeader from "../../components/SubHeader.vue";
import axios from "axios";
import CONSTANTS from "../../constants";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const props = defineProps({
  isModalOpen: String,
});

const nif = ref("");
const pais = ref("");
const codigoPostal = ref("");
const correoElectronico = ref("");
const provincia = ref("");
const direccion = ref("");
const nombre = ref("");
const apellidos = ref("");
const poblacion = ref("");

const createClient = () => {
  const client = {
    nif: nif.value,
    nombre: nombre.value,
    apellidos: apellidos.value,
    codigo_postal: codigoPostal.value,
    pais: pais.value,
    direccion: direccion.value,
    provincia: provincia.value,
    correo_electronico: correoElectronico.value,
    poblacion: poblacion.value,
    id_usuario: store.getters.getLoggedUser.nif,
  };
  console.log("CLIENTE", client);
  // axios.post(`${CONSTANTS.CLIENTES_API_URL}/new`, client).then(({ data }) => {
  //   if (data.statusCode === 200) {
  //     $emit('closeModal', true)
  //   }
  // });
};
</script>

<template>
  <MDBModal labelledby="newClientModal" v-model="props.isModalOpen">
    <MDBModalHeader class="mx-4 mt-2">
      <MDBModalTitle id="newClientModal"> Nuevo cliente </MDBModalTitle>
    </MDBModalHeader>
    <form @submit.prevent="createClient">
      <MDBModalBody class="mt-3">
        <MDBRow start class="justify-content-center">
          <MDBCol col="5" class="pe-3">
            <MDBInput
              inputGroup
              type="text"
              placeholder="Nombre"
              :formOutline="false"
              v-model="nombre"
              wrapperClass="mb-4"
              required
            >
              <template #prepend>
                <span class="input-group-text"
                  ><MDBIcon icon="user"></MDBIcon
                ></span>
              </template>
            </MDBInput>
            <MDBInput
              inputGroup
              type="text"
              placeholder="Apellidos"
              :formOutline="false"
              v-model="apellidos"
              wrapperClass="mb-4"
              required
            >
              <template #prepend>
                <span class="input-group-text"
                  ><MDBIcon icon="user"></MDBIcon
                ></span>
              </template>
            </MDBInput>
          </MDBCol>
          <MDBCol col="5" class="ps-3">
            <MDBInput
              inputGroup
              type="text"
              placeholder="NIF"
              :formOutline="false"
              v-model="nif"
              wrapperClass="mb-4"
              required
            >
              <template #prepend>
                <span class="input-group-text"
                  ><MDBIcon icon="address-card"></MDBIcon
                ></span>
              </template>
            </MDBInput>
            <MDBInput
              inputGroup
              type="email"
              placeholder="Correo electrónico"
              :formOutline="false"
              v-model="correoElectronico"
              wrapperClass="mb-4"
              required
            >
              <template #prepend>
                <span class="input-group-text"
                  ><MDBIcon icon="at"></MDBIcon
                ></span>
              </template>
            </MDBInput>
          </MDBCol>
        </MDBRow>
        <MDBRow class="justify-content-center">
          <MDBCol col="10" class="ps-3">
            <MDBInput
              inputGroup
              type="text"
              placeholder="Dirección"
              :formOutline="false"
              v-model="direccion"
              wrapperClass="mb-4"
              required
            >
              <template #prepend>
                <span class="input-group-text"
                  ><MDBIcon icon="home"></MDBIcon
                ></span>
              </template>
            </MDBInput>
          </MDBCol>
        </MDBRow>
        <MDBRow class="justify-content-center">
          <MDBCol col="5" class="ps-3">
            <MDBInput
              inputGroup
              type="text"
              placeholder="Código postal"
              :formOutline="false"
              v-model="codigoPostal"
              wrapperClass="mb-4"
              required
            >
              <template #prepend>
                <span class="input-group-text"
                  ><MDBIcon icon="map-marker-alt"></MDBIcon
                ></span>
              </template>
            </MDBInput>

            <MDBInput
              inputGroup
              type="text"
              placeholder="Provincia"
              :formOutline="false"
              v-model="provincia"
              wrapperClass="mb-4"
              required
            >
              <template #prepend>
                <span class="input-group-text"
                  ><MDBIcon icon="map-marker-alt"></MDBIcon
                ></span>
              </template>
            </MDBInput>
          </MDBCol>
          <MDBCol col="5" class="ps-3">
            <MDBInput
              inputGroup
              type="text"
              placeholder="Población"
              :formOutline="false"
              v-model="poblacion"
              wrapperClass="mb-4"
              required
            >
              <template #prepend>
                <span class="input-group-text"
                  ><MDBIcon icon="map-marker-alt"></MDBIcon
                ></span>
              </template>
            </MDBInput>

            <MDBInput
              inputGroup
              type="text"
              placeholder="Pais"
              v-model="pais"
              wrapperClass="mb-4"
              required
              :formOutline="false"
            >
              <template #prepend>
                <span class="input-group-text"
                  ><MDBIcon icon="globe"></MDBIcon
                ></span>
              </template>
            </MDBInput>
          </MDBCol>
        </MDBRow>
      </MDBModalBody>
      <MDBModalFooter class="py-3">
        <MDBBtn color="secondary" @click="() => $emit('closeModal', false)"
          >Cancelar</MDBBtn
        >
        <MDBBtn color="primary" class=" mx-4 " type="submit"
          >Crear cliente</MDBBtn
        >
      </MDBModalFooter>
    </form>
  </MDBModal>
</template>

<style lang="scss" scoped>
.modal {
  --mdb-modal-width: 70%;
}
</style>