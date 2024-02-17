<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { MDBTable, MDBBtn, MDBBadge, MDBIcon } from "mdb-vue-ui-kit";
import { useStore } from "vuex"
import axios from 'axios'
import CONSTANTS from '../../constants'

const titles = ref([
  "ID",
  "Nombre",
  "Fecha de emisión",
  "Fecha de vencimiento",
  "Importe total",
  "Estado",
  "Acciones",
]);
const facturas = ref(new Array<Object>())
/* 
const facturas = ref([
  {
    idFactura: "1",
    fechaEmision: "13/10/2024",
    fechaVencimiento: "24/11/2024",
    precioTotal: "546,78",
    estadoPago: {
      estado: "pendiente",
      badge:"warning",
      text: "Pendiente"
    },
  },
  {
    idFactura: "2",
    fechaEmision: "13/10/2024",
    fechaVencimiento: "24/11/2024",
    precioTotal: "546,78",
    estadoPago: {
      estado: "pagado",
      badge:"success",
      text: "Pagado"
    },
  },
  {
    idFactura: "3",
    fechaEmision: "13/10/2024",
    fechaVencimiento: "24/11/2024",
    precioTotal: "546,78",
    estadoPago: {
      estado: "vencido",
      badge:"danger",
      text: "Vencido"
    },
  },
]); */

const store = useStore();
const userId = ref("");

onMounted(async () => {
  userId.value = store.getters.getLoggedUser.nif;

  axios.get(`${CONSTANTS.FACTURAS_API_URL}/emisor/${userId.value}`).then(({ data: response }) => {
    if (response.statusCode === 200) {
      response.data.forEach(async (factura: any) => {
        const { data: clienteResponse } = await axios.get(`${CONSTANTS.CLIENTES_API_URL}/${factura.id_receptor}`)
        facturas.value.push(formatFactura(factura, clienteResponse.data))
      })
    }
  })
});

const formatFactura = (factura: any, cliente: any) => {
  return {
          idFactura: factura.id_factura,
          fechaEmision: factura.fecha_emision,
          fechaVencimiento: factura.fecha_vencimiento,
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

const edit = (idFactura: Number) => {
  console.log("editar factura", idFactura);
}

const remove = (idFactura: Number) => {
  console.log("eliminar factura", idFactura);
}

</script>

<template>
  <section>
    <p>Facturas</p>
    <MDBBtn color="primary">
      <MDBIcon icon="plus" class="me-2"></MDBIcon>Nueva Factura
    </MDBBtn>
    <MDBTable class="align-middle mb-0 bg-white" v-if="facturas.length > 0">
      <thead class="bg-light">
        <tr>
          <th v-for="(title, index) in titles" :key="index">{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(factura, index) in facturas" :key="index">
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