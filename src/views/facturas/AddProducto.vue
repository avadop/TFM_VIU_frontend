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

const date = ref();

const store = useStore();
const emit = defineEmits(["closeModal", "addProduct"]);

const props = defineProps({
  isModalOpen: Boolean,
});

const cantidad = ref(1);
const idProducto = ref("");
const allProductos = ref(new Array());

onMounted(() => {
  const userId = store.getters.getLoggedUser.nif;

  axios
    .get(`${CONSTANTS.PRODUCTOS_API_URL}/usuario/${userId}`)
    .then(({ data: response }: any) => {
      if (response.statusCode === 200) {
        response.data.forEach((producto: any) => {
          allProductos.value.push({
            idProducto: producto.id_producto,
            nombre: producto.nombre,
          });
        });
      }
    });
});

const submitForm = () => {
  const producto = {
    idProducto: idProducto.value,
    cantidad: cantidad.value,
  };

  emit("addProduct", producto);
};

const closeModal = () => {
  //Limpiar formulario
  idProducto.value = "";
  cantidad.value = 1;
  emit("closeModal", true);
};
</script>

<template>
  <MDBModal labelledby="newClientModal" v-model="props.isModalOpen">
    <MDBModalHeader class="mx-4 mt-2">
      <MDBModalTitle id="newClientModal"> Nueva factura </MDBModalTitle>
    </MDBModalHeader>
    <form @submit.prevent="submitForm">
      <MDBModalBody class="mt-3">
        <MDBRow start class="justify-content-center">
          <MDBCol col="5" class="pe-3">
            <label for="clientes-input" class="form-label mt-3"
              >Producto
            </label>
            <select
              class="form-select"
              v-model="idProducto"
              aria-label="Default select example"
              required
            >
              <option
                v-for="(producto, index) in allProductos"
                :key="index"
                :value="producto.idProducto"
              >
                {{ producto.nombre }}
              </option>
            </select>
          </MDBCol>
          <MDBCol col="5" class="pe-3">
            <label for="cantidad-input" class="form-label">Cantidad</label>
            <MDBInput
              id="cantidad-input"
              inputGroup
              type="number"
              min="1"
              placeholder="1"
              :formOutline="false"
              v-model="cantidad"
              wrapperClass="mb-3"
              required
            >
              <template #prepend>
                <span class="input-group-text">
                  <MDBIcon icon="euro-sign"></MDBIcon>
                </span>
              </template>
            </MDBInput>
          </MDBCol>
        </MDBRow>
      </MDBModalBody>
      <MDBModalFooter class="py-3">
        <MDBBtn color="secondary" @click="closeModal">Cancelar</MDBBtn>
        <MDBBtn color="primary" class="mx-4" type="submit"
          >Añadir producto</MDBBtn
        >
      </MDBModalFooter>
    </form>
  </MDBModal>
</template>

<style lang="scss" scoped>
.form-select {
  height: 38px;
}
</style>