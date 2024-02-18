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
const precioBase = ref(0);
const precioVenta = ref(0);
const impuesto = ref(21.00);
const stock = ref(0);
const nombre = ref("");

watch(
  () => props.isEdit,
  (newValue) => {
    if (newValue) {
      axios
        .get(`${CONSTANTS.PRODUCTOS_API_URL}/${props.idEditProduct}`)
        .then(({ data: response }: any) => {
          if (response.statusCode === 200) {
            descripcion.value = response.data.descripcion;
            precioBase.value = response.data.precio_unidad;
            precioVenta.value = Number(response.data.precio_unidad * (impuesto.value/100 + 1)).toFixed(2)
            nombre.value = response.data.nombre;
            stock.value = response.data.stock;
            impuesto.value = response.data.impuesto;
          }
        });
    }
  }
);

const submitForm = () => {
  const product = {
    id_producto: props.idEditProduct,
    descripcion: descripcion.value,
    nombre: nombre.value,
    impuesto: impuesto.value,
    precio_unidad: precioBase.value,
    stock: stock.value,
    id_usuario: store.getters.getLoggedUser.nif,
  };
  if (props.isEdit) {
    axios
      .put(`${CONSTANTS.PRODUCTOS_API_URL}/${props.idEditProduct}`, product)
      .then(({ data }: any) => {
        if (data.statusCode === 200) {
          closeModal();
        }
      });
  } else {
    axios
      .post(`${CONSTANTS.PRODUCTOS_API_URL}/new`, product)
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
  precioBase.value = 0;
  precioVenta.value = 0;
  nombre.value = "";
  stock.value = 0;
  impuesto.value = 21.00;
  emit("closeModal", true);
};

const precioVentaChanged = (event) => {
  const precioV = event.target.value
  precioBase.value = Number(precioV / (impuesto.value/100 + 1)).toFixed(2)
  precioVenta.value = precioV
}

const precioBaseChanged = (event) => {
  const precioB = event.target.value
  precioVenta.value = Number(precioB * (impuesto.value/100 + 1)).toFixed(2)
  precioBase.value = precioB

}

const impuestoChanged = (event) => {
  const newImpuesto = event.target.value
  precioBase.value = Number(precioVenta.value / (impuesto.value/100 + 1)).toFixed(2)
  impuesto.value = newImpuesto

}
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
              wrapperClass="mb-3"
              required
            >
              <template #prepend>
                <span class="input-group-text">
                  <MDBIcon icon="font"></MDBIcon>
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
              wrapperClass="mb-3"
            >
              <template #prepend>
                <span class="input-group-text">
                  <MDBIcon icon="scroll"></MDBIcon>
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
              type="number"
              placeholder="0"
              step="0.01"
              min="0"
              :formOutline="false"
              v-model="precioBase"
              @input="precioBaseChanged"
              wrapperClass="mb-4"
              required
            >
              <template #prepend>
                <span class="input-group-text">
                  <MDBIcon icon="euro-sign"></MDBIcon>
                </span>
              </template>
            </MDBInput>
          </MDBCol>
          <MDBCol col="2">
            <label for="impuesto-input" class="form-label">Impuesto</label>
            <MDBInput
            id="impuest-input"
              inputGroup
              type="number"
              step="0.01"
              min="0"
              placeholder="21,00"
              :formOutline="false"
              v-model="impuesto"
              @input="impuestoChanged"
              required
            >
              <template #prepend>
                <span class="input-group-text">
                  <MDBIcon icon="percent"></MDBIcon>
                </span>
              </template>
            </MDBInput>
          </MDBCol>
          <MDBCol col="3">
            <label for="precio-unidad-input" class="form-label">Precio venta</label>
            <MDBInput
            id="precio-unidad-input"
              inputGroup
              type="number"
              step="0.01"
              min="0"
              placeholder="0"
              :formOutline="false"
              v-model="precioVenta"
              @input="precioVentaChanged"
              wrapperClass="mb-4"
              required
            >
              <template #prepend>
                <span class="input-group-text">
                  <MDBIcon icon="euro-sign"></MDBIcon>
                </span>
              </template>
            </MDBInput>
          </MDBCol>
          <MDBCol col="2">
            <label for="stock-input" class="form-label">Stock</label>
            <MDBInput
              id="stock-input"
              inputGroup
              type="number"
              placeholder="0"
              :formOutline="false"
              v-model="stock"
              wrapperClass="mb-4"
              required
            >
              <template #prepend>
                <span class="input-group-text">
                  <MDBIcon icon="box-open"></MDBIcon>
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
          >Crear producto</MDBBtn
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