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
import ProductosTable from './ProductosTable.vue'

const store = useStore();
const emit = defineEmits(["closeModal"]);

const props = defineProps({
  factura: Object,
  isModalOpen: Boolean
});

const cliente = ref()
const emisor = ref()
const productos = ref(new Array());
const importeBase = ref(0)


watch(
  () => props.factura,
  () => {
    const userId = store.getters.getLoggedUser.nif;

    loadCliente(props.factura?.idCliente)
    loadProductosFactura(props.factura?.idFactura)
    loadEmisor(userId)
  }
);

const loadCliente = (idCliente: string) => {
  axios.get(`${CONSTANTS.CLIENTES_API_URL}/${idCliente}`).then(({ data: response }: any) => {
    if (response.statusCode === 200) {
      const client = response.data
      cliente.value = {
        nif: client.nif,
        nombre: `${client.nombre} ${client.apellidos}`,
        direccion: `${client.direccion}, ${client.poblacion}, ${client.codigoPostal} ${client.provincia}, ${client.pais}`,
        email: client.correo_electronico
      }
    }
  })
}

const loadProductosFactura = (idFactura: number) => {
  axios.get(`${CONSTANTS.PRODUCTOS_FACTURA_API_URL}/factura_id/${idFactura}`).then(({ data: response }: any) => {
    if (response.statusCode === 200) {
      response.data.forEach((prod_factura: any) => addProduct({ cantidad: prod_factura.cantidad, idProducto: prod_factura.id_producto }))
    }
  })
}

const loadEmisor = (nif: string) => {
  axios.get(`${CONSTANTS.USUARIOS_API_URL}/${nif}`).then(({data:response}:any) => {
    if(response.statusCode === 200) {
      emisor.value = {
        nif: response.data.nif,
        nombre: `${response.data.nombre} ${response.data.apellidos}`
      }
    }
  })
}

const addProduct = (product: { cantidad: number, idProducto: number }) => {
  axios.get(`${CONSTANTS.PRODUCTOS_API_URL}/${product.idProducto}`)
    .then(({ data: response }: any) => {
      if (response.statusCode === 200) {
        productos.value.push({ ...response.data, cantidad: product.cantidad })
        importeBase.value = importeBase.value + (response.data.precio_unidad * product.cantidad)
      }
    });
}

const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const closeModal = () => {
  //Limpiar formulario
  productos.value = new Array();
  cliente.value = {}
  importeBase.value = 0
  emit("closeModal");
};

const generatePDF = () => {
}

</script>

<template>
  <MDBModal labelledby="detallesFactura" v-model="props.isModalOpen">
    <MDBModalHeader class="mx-4 mt-2">
      <h2 id="detallesFactura"> Detalles factura</h2>
    </MDBModalHeader>
    <MDBModalBody class="mt-3">
      <MDBRow start>
        <MDBCol offsetMd="1" col="5" class="ps-4">
          <h3 class="mb-3">Información factura </h3>
          <p class="mb-2"><strong>Identificador factura:</strong> {{ emisor?.nif }}{{ props.factura?.idFactura }}</p>
          <p class="mb-2"><strong>Fecha Emisión:</strong> {{ new Date(props.factura?.fechaVencimiento).toLocaleDateString('en-GB') }}</p>
          <p class="mb-2"><strong>Fecha Vencimiento:</strong> {{ new Date(props.factura?.fechaVencimiento).toLocaleDateString('en-GB') }}</p>
          <p class="mb-2"><strong>Nº identificación emisor:</strong> {{ emisor?.nif }}</p>
          <p class="mb-2"><strong>Nombre del emisor:</strong> {{ emisor?.nombre }}</p>
        </MDBCol>

        <MDBCol offsetMd="1" col="5" class="pe-4">
          <h3 class="mb-3">Información cliente </h3>
          <p class="mb-2"><strong>NIF:</strong> {{ cliente?.nif }}</p>
          <p class="mb-2"><strong>Nombre:</strong> {{ cliente?.nombre }}</p>
          <p class="mb-2"><strong>Correo electrónico:</strong> {{ cliente?.email }}</p>
          <p class="mb-2"><strong>Dirección:</strong> {{ cliente?.direccion }}</p>
        </MDBCol>
      </MDBRow>
      <MDBRow class="justify-content-center mt-3">
        <MDBCol col="10">
          <h3 class="mb-2">Productos </h3>
          <ProductosTable v-if="productos.length > 0" :productos="productos" />
          <div class="d-flex flex-column mt-3 align-items-end">
            <p class="mb-2"><strong>Importe base:</strong> {{ importeBase.toFixed(2) }} €</p>
            <p class="mb-0"><strong>Importe tras impuestos:</strong> {{ props.factura?.precioTotal }}</p>
          </div>
        </MDBCol>
      </MDBRow>

    </MDBModalBody>
    <MDBModalFooter class="py-3 mt-2">
      <MDBBtn color="primary" size="lg" @click="generatePDF">
        <MDBIcon icon="download" class="me-3" size="lg"></MDBIcon>Descargar factura (PDF)
      </MDBBtn>
      <MDBBtn color="secondary" class="mx-4" size="lg" @click="closeModal">Aceptar</MDBBtn>
    </MDBModalFooter>
  </MDBModal>
</template>

<style lang="scss" scoped>
.modal {
  --mdb-modal-width: 70%;
}

.form-select {
  height: 38px;
}
</style>