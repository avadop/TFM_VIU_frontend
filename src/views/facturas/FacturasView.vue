<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { MDBTable, MDBCol, MDBRow, MDBBtn, MDBBadge, MDBIcon } from "mdb-vue-ui-kit";
import { useStore } from "vuex"
import axios from 'axios'
import CONSTANTS from '../../constants'
import FacturaModal from './FacturaForm.vue'
import DetallesFacturaModal from './DetallesFactura.vue'
import SubHeader from "../../components/SubHeader.vue";

const titles = ref([
  "ID",
  "Nombre",
  "Fecha de emisión",
  "Fecha de vencimiento",
  "Importe total",
  "Estado",
  "Acciones",
]);
const facturas = ref(new Array())

const store = useStore();
const userId = ref("");
const editFactura = ref(false)
const idEditFactura = ref(-1)
const openFacturaModal = ref(false)

const openDetallesFacturaModal = ref(false)
const selectedFactura = ref()

onMounted(async () => {
  userId.value = store.getters.getLoggedUser.nif;
  getFacturas()
});

const getFacturas = () => {
  axios.get(`${CONSTANTS.FACTURAS_API_URL}/emisor/${userId.value}`).then(({ data: response }) => {
    facturas.value = new Array()
    if (response.statusCode === 200) {
      response.data.forEach(async (factura: any) => {
        const { data: clienteResponse } = await axios.get(`${CONSTANTS.CLIENTES_API_URL}/${factura.id_receptor}`)
        if (clienteResponse.data.nif !== userId.value) {
          facturas.value.push(formatFactura(factura, clienteResponse.data))
        }
      })
    }
  })
}

const formatFactura = (factura: any, cliente: any) => {
  return {
    idFactura: factura.id_factura,
    fechaEmision: new Date(factura.fecha_emision).toLocaleDateString('en-GB'),
    fechaVencimiento: new Date(factura.fecha_vencimiento).toLocaleDateString('en-GB'),
    nombreCliente: `${cliente.nombre} ${cliente.apellidos}`,
    idCliente: cliente.nif,
    precioTotal: `${factura.precio_total} €`,
    estadoPago: formatEstadoPago(factura.estado_pago)
  }
}

const formatEstadoPago = (estadoPago: String) => {
  if (estadoPago === 'pagado')
    return { badge: 'success', text: 'Pagado' }
  else if (estadoPago === 'vencido')
    return { badge: 'danger', text: 'Vencido' }
  else return { badge: 'warning', text: 'Pendiente' }

}

const edit = (idFactura: number) => {
  editFactura.value = true
  openFacturaModal.value = true
  idEditFactura.value = idFactura
};

const remove = (idFactura: number) => {
  axios.delete(`${CONSTANTS.FACTURAS_API_URL}/${idFactura}`).then(({ data }: any) => {
    if (data.statusCode === 200) {
      getFacturas()
    }
  })
};

const newFactura = () => {
  openFacturaModal.value = true
  editFactura.value = false
  idEditFactura.value = -1
}

const closeFacturaModal = (reload: Boolean) => {
  openFacturaModal.value = false
  editFactura.value = false
  idEditFactura.value = -1
  if (reload) {
    getFacturas()
  }
}

const openFacturaIndividual = (factura: any) => {
  selectedFactura.value = factura
  openDetallesFacturaModal.value = true
}

const closeFacturaIndividual = () => {
  selectedFactura.value = {}
  openDetallesFacturaModal.value = false
}

</script>

<template>
  <section class="background-orange">
    <MDBRow start class="justify-content-center">
      <MDBCol col="10">
        <div class="mt-4 d-flex justify-content-between">
          <h2 style="font-weight: 600;">Facturas</h2>
          <MDBBtn color="primary" @click="newFactura">
            <MDBIcon icon="plus" class="me-2"></MDBIcon>Nueva Factura
          </MDBBtn>
        </div>
        <FacturaModal :isModalOpen="openFacturaModal" :idEditFactura="idEditFactura" :isEdit="editFactura"
          @closeModal="closeFacturaModal" />
        <DetallesFacturaModal :factura="selectedFactura" :isModalOpen="openDetallesFacturaModal"
          @closeModal="closeFacturaIndividual"></DetallesFacturaModal>
        <MDBTable hover class="align-middle mb-0 bg-white mt-4 table-border">
          <thead class="bg-light">
            <tr>
              <th v-for="(title, index) in titles" :key="index">{{ title }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(factura, index) in facturas" :key="index" style="cursor:pointer">
              <td @click="openFacturaIndividual(factura)">{{ userId }}{{ factura.idFactura }}</td>
              <td @click="openFacturaIndividual(factura)">{{ factura.nombreCliente }}</td>
              <td @click="openFacturaIndividual(factura)">{{ factura.fechaEmision }}</td>
              <td @click="openFacturaIndividual(factura)">{{ factura.fechaVencimiento }}</td>
              <td @click="openFacturaIndividual(factura)">{{ factura.precioTotal }}</td>
              <td @click="openFacturaIndividual(factura)">
                <MDBBadge :badge="factura.estadoPago.badge" pill class="d-inline">{{ factura.estadoPago.text }}</MDBBadge>
              </td>
              <td>
                <div class="d-flex">
                  <MDBBtn color="link" size="sm" floating @click="edit(factura.idFactura)">
                    <MDBIcon icon="pen"></MDBIcon>
                  </MDBBtn>
                  <MDBBtn color="link" size="sm" floating @click="remove(factura.idFactura)">
                    <MDBIcon icon="trash" style="color: #c21807"></MDBIcon>
                  </MDBBtn>
                </div>
              </td>
            </tr>
          </tbody>
        </MDBTable>
      </MDBCol>
    </MDBRow>

  </section>
</template>

<style lang="scss" scoped>
</style>