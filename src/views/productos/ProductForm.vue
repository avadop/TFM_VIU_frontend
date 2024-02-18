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
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import CONSTANTS from "../../constants";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["closeModal"]);

const props = defineProps({
  isModalOpen: Boolean,
  isEdit: Boolean,
  idEditProduct: Number,
});

const descripcion = ref("");
const precioUnidad = ref("");
const impuesto = ref("");
const stock = ref("");
const nombre = ref("");

watch(
  () => props.isEdit,
  (newValue) => {
    if (newValue) {
      axios
        .get(`${CONSTANTS.PRODUCTOS_API_URL}/${props.idEditProduct}`)
        .then(({ data: response }: any) => {
          console.log("response", response);
          if (response.statusCode === 200) {
            descripcion.value = response.data.descripcion;
            precioUnidad.value = response.data.precio_unidad;
            nombre.value = response.data.nombre;
            stock.value = response.data.stock;
            impuesto.value = response.data.impuesto;
          }
        });
    }
  }
);

const submitForm = () => {
  const client = {
    descripcion: descripcion.value,
    nombre: nombre.value,
    impuesto: impuesto.value,
    precio_unidad: precioUnidad.value,
    stock: stock.value,
    id_usuario: store.getters.getLoggedUser.nif,
  };
  if (props.isEdit) {
    axios
      .put(`${CONSTANTS.PRODUCTOS_API_URL}/${props.idEditProduct}`, client)
      .then(({ data }: any) => {
        if (data.statusCode === 200) {
          closeModal();
        }
      });
  } else {
    axios
      .post(`${CONSTANTS.PRODUCTOS_API_URL}/new`, client)
      .then(({ data }: any) => {
        if (data.statusCode === 200) {
          closeModal();
        }
      });
  }
};

const closeModal = () => {
  //Limpiar formulario
  descripcion.value = "";
  precioUnidad.value = "";
  nombre.value = "";
  stock.value = "";
  impuesto.value = "";
  emit("closeModal", true);
};
</script>

<template>
  <MDBModal labelledby="newClientModal" v-model="props.isModalOpen">
    <MDBModalHeader class="mx-4 mt-2">
      <MDBModalTitle id="newClientModal"> Nuevo producto </MDBModalTitle>
    </MDBModalHeader>
    <form @submit.prevent="submitForm">
      <MDBModalBody class="mt-3">
        <MDBRow start >
          <MDBCol offsetMd="1" col="5" class="pe-3">
            <label for="nombre-input" class="form-label">Nombre</label>

            <MDBInput
            id="nombre-input"
              inputGroup
              type="text"
              placeholder="Nombre"
              :formOutline="false"
              v-model="nombre"
              wrapperClass="mb-4"
              required
            >
              <template #prepend>
                <span class="input-group-text">
                  <MDBIcon icon="user"></MDBIcon>
                </span>
              </template>
            </MDBInput>
          </MDBCol>
        </MDBRow>
        <MDBRow class="justify-content-center">
          <MDBCol col="10">
            <label for="descripcion-input" class="form-label">Descripción</label>

            <MDBInput
              inputGroup
              type="text"
              id="descripcion-input"
              placeholder="Descripcion"
              :formOutline="false"
              v-model="descripcion"
              wrapperClass="mb-4"
            >
              <template #prepend>
                <span class="input-group-text">
                  <MDBIcon icon="address-card"></MDBIcon>
                </span>
              </template>
            </MDBInput>
          </MDBCol>
        </MDBRow>
        <MDBRow class="justify-content-center">
          <MDBCol col="3" >
            <label for="precio-base-input" class="form-label">Precio sin impuestos</label>

            <MDBInput
            id="precio-base-input"
              inputGroup
              type="text"
              placeholder="0"
              :formOutline="false"
              v-model="precioUnidad"
              wrapperClass="mb-4"
              required
            >
              <template #prepend>
                <span class="input-group-text">
                  <MDBIcon icon="map-marker-alt"></MDBIcon>
                </span>
              </template>
            </MDBInput>
          </MDBCol>
          <MDBCol col="2">
            <label for="impuesto-input" class="form-label">Impuesto</label>
            <MDBInput
            id="impuest-input"
              inputGroup
              type="text"
              placeholder="21,00"
              :formOutline="false"
              v-model="impuesto"
              wrapperClass="mb-4"
              required
            >
              <template #prepend>
                <span class="input-group-text">
                  <MDBIcon icon="map-marker-alt"></MDBIcon>
                </span>
              </template>
            </MDBInput>
          </MDBCol>
          <MDBCol col="3">
            <label for="precio-unidad-input" class="form-label">Precio venta</label>
            <MDBInput
            id="precio-unidad-input"
              inputGroup
              type="text"
              placeholder="0"
              :formOutline="false"
              v-model="precioUnidad"
              wrapperClass="mb-4"
              required
            >
              <template #prepend>
                <span class="input-group-text">
                  <MDBIcon icon="map-marker-alt"></MDBIcon>
                </span>
              </template>
            </MDBInput>
          </MDBCol>
          <MDBCol col="2">
            <label for="stock-input" class="form-label">Stock</label>
            <MDBInput
              id="stock-input"
              inputGroup
              type="text"
              placeholder="0"
              :formOutline="false"
              v-model="stock"
              wrapperClass="mb-4"
              required
            >
              <template #prepend>
                <span class="input-group-text">
                  <MDBIcon icon="map-marker-alt"></MDBIcon>
                </span>
              </template>
            </MDBInput>
          </MDBCol>
        </MDBRow>
      </MDBModalBody>
      <MDBModalFooter class="py-3">
        <MDBBtn color="secondary" @click="closeModal">Cancelar</MDBBtn>
        <MDBBtn v-if="props.isEdit" color="primary" class="mx-4" type="submit"
          >Confirmar cambios</MDBBtn
        >
        <MDBBtn v-else color="primary" class="mx-4" type="submit"
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