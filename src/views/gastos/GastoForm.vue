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
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const date = ref();

const store = useStore();
const emit = defineEmits(["closeModal"]);

const props = defineProps({
  isModalOpen: Boolean,
  isEdit: Boolean,
  idEditGasto: Number,
});

const fechaEmision = ref(new Date());
const fechaVencimiento = ref(new Date());
const estadoPago = ref(CONSTANTS.EstadoPago[CONSTANTS.EstadoPago.pendiente]);
const precioTotal = ref(0);

watch(
  () => props.isEdit,
  (newValue) => {
    if (newValue) {
      axios
        .get(`${CONSTANTS.FACTURAS_API_URL}/${props.idEditGasto}`)
        .then(({ data: response }: any) => {
          if (response.statusCode === 200) {
            fechaEmision.value = new Date(response.data.fecha_emision);
            fechaVencimiento.value = new Date(response.data.fecha_vencimiento);
            estadoPago.value = response.data.estado_pago;
            precioTotal.value = response.data.precio_total;
          }
        });
    }
  }
);

const submitForm = () => {
  const userId = store.getters.getLoggedUser.nif;
  
  const gasto = {
    id_factura: props.idEditGasto,
    fecha_vencimiento: formatDate(fechaVencimiento.value),
    fecha_emision: formatDate(fechaEmision.value),
    estado_pago: estadoPago.value,
    precio_total: precioTotal.value,
    id_emisor: userId,
    id_receptor: userId,
  };
  if (props.isEdit) {
    axios
      .put(`${CONSTANTS.FACTURAS_API_URL}/${props.idEditGasto}`, gasto)
      .then(({ data }: any) => {
        if (data.statusCode === 200) {
          closeModal();
        }
      });
  } else {
    axios
      .post(`${CONSTANTS.FACTURAS_API_URL}/new`, gasto)
      .then(({ data }: any) => {
        if (data.statusCode === 200) {
          closeModal();
        }
      });
  }
};

const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

const closeModal = () => {
  //Limpiar formulario
  fechaEmision.value = new Date();
  fechaVencimiento.value = new Date();
  estadoPago.value = CONSTANTS.EstadoPago[CONSTANTS.EstadoPago.pendiente];
  precioTotal.value = 0;
  emit("closeModal", true);
};
</script>

<template>
  <MDBModal labelledby="newClientModal" v-model="props.isModalOpen">
    <MDBModalHeader class="mx-4 mt-2">
      <MDBModalTitle id="newClientModal"> Editar gasto </MDBModalTitle>
    </MDBModalHeader>
    <form @submit.prevent="submitForm">
      <MDBModalBody class="mt-3">
        <MDBRow start class="justify-content-center">
          <MDBCol col="4" class="pe-3">
            <label for="fecha-emision-input" class="form-label"
              >Fecha de emisión</label
            >
            <DatePicker
              required
              id="fecha-emision-input"
              format="dd/MM/yyyy"
              v-model="fechaEmision"
              :enable-time-picker="false"
            />
            <label for="precio-total-input" class="form-label mt-3"
              >Importe total</label
            >

            <MDBInput
              id="precio-total-input"
              inputGroup
              type="number"
              step="0.01"
              min="0"
              placeholder="0"
              :formOutline="false"
              v-model="precioTotal"
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
          <MDBCol col="4" class="pe-3">
            <label for="fecha-vencimiento-input" class="form-label"
              >Fecha de vencimiento</label
            >
            <DatePicker
              required
              id="fecha-vencimiento-input"
              format="dd/MM/yyyy"
              v-model="fechaVencimiento"
              :enable-time-picker="false"
            />
            <label for="estado-pago-input" class="form-label mt-3"
              >Estado de pago </label
            >
            <select class="form-select " v-model="estadoPago" aria-label="Default select example">
              <option :value="CONSTANTS.EstadoPago[0]">Pagado</option>
              <option :value="CONSTANTS.EstadoPago[1]" selected>Pendiente</option>
              <option :value="CONSTANTS.EstadoPago[2]">Vencido</option>
            </select>
          </MDBCol>
        </MDBRow>
      </MDBModalBody>
      <MDBModalFooter class="py-3">
        <MDBBtn color="secondary" @click="closeModal">Cancelar</MDBBtn>
        <MDBBtn v-if="props.isEdit" color="primary" class="mx-4" type="submit"
          >Confirmar cambios</MDBBtn
        >
        <MDBBtn v-else color="primary" class="mx-4" type="submit"
          >Crear gasto</MDBBtn
        >
      </MDBModalFooter>
    </form>
  </MDBModal>
</template>

<style lang="scss" scoped>
.modal {
  --mdb-modal-width: 55%;
}

.form-select{
  height: 36px;
}
</style>