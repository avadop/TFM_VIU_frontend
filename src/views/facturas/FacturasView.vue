<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { MDBTable, MDBBtn, MDBBadge, MDBIcon } from "mdb-vue-ui-kit";
import { useStore } from "vuex"
import axios from 'axios'
import CONSTANTS from '../../constants'
import FacturaModal from './FacturaForm.vue'

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
        if(clienteResponse.data.nif !== userId.value) {
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
  console.log("editar gasto", idFactura);
  editFactura.value = true
  openFacturaModal.value = true
  idEditFactura.value = idFactura
};

const remove = (idFactura: number) => {
  console.log("eliminar gasto", idFactura);
    axios.delete(`${CONSTANTS.FACTURAS_API_URL}/${idFactura}`).then(({data}:any) => {
    if(data.statusCode === 200) {
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
  if(reload) {
    getFacturas()
  }
}

const openFacturaIndividual = () => {
  console.log("OPEN INDIVIDUAL")
}

</script>

<template>
  <section>
    <p>Facturas</p>
    <MDBBtn color="primary" @click="newFactura">
      <MDBIcon icon="plus" class="me-2"></MDBIcon>Nueva Factura
    </MDBBtn>
    <FacturaModal :isModalOpen="openFacturaModal" :idEditFactura="idEditFactura" :isEdit="editFactura" @closeModal="closeFacturaModal"/>
    <MDBTable hover class="align-middle mb-0 bg-white mt-4">
      <thead class="bg-light">
        <tr>
          <th v-for="(title, index) in titles" :key="index">{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(factura, index) in facturas" :key="index" style="cursor:pointer" @click="openFacturaIndividual">
          <td>{{ userId }}{{ factura.idFactura }}</td>
          <td>{{ factura.nombreCliente }}</td>
          <td>{{ factura.fechaEmision }}</td>
          <td>{{ factura.fechaVencimiento }}</td>
          <td>{{ factura.precioTotal }}</td>
          <td>
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
  </section>
</template>

<style lang="scss" scoped></style>