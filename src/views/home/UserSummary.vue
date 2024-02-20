<script setup lang="ts">
import { MDBTable, MDBBtn, MDBRow, MDBCol } from "mdb-vue-ui-kit";
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import SubHeader from "../../components/SubHeader.vue";
import SummaryCard from "../../components/SummaryCard.vue";
import axios from 'axios'
import CONSTANTS from '../../constants'
import { format } from "path";

const store = useStore()
const router = useRouter()
const user = ref({ nombre: "", nif: "" });

const ingresos = ref(new Map<number, number>())
const gastos = ref(new Map<number, number>())
const ultimasVentas = ref(new Array())

onMounted(() => {
  user.value = store.getters.getLoggedUser
  calcularIngresos()
  calcularGastos()

  resetMaps();
})

const resetMaps = () => {
  ingresos.value = new Map<number, number>()
  gastos.value = new Map<number, number>()
  for (var i = 0; i < 12; i++) {
    gastos.value.set(i + 1, 0)
    ingresos.value.set(i + 1, 0);
  }
}

const calcularGastos = () => {
  axios.get(`${CONSTANTS.FACTURAS_API_URL}/receptor/${user.value.nif}`).then(({ data: response }: any) => {
    if (response.statusCode === 200) {
      response.data.forEach((gasto: any) => {
        const date = new Date(gasto.fecha_emision)
        if (date.getFullYear() === new Date().getFullYear()) {
          const month = date.getMonth() + 1
          const gastoAcumulado = gastos.value.get(month) + gasto.precio_total
          gastos.value.set(month, gastoAcumulado)
        }
      })
    }
  })
}


const calcularIngresos = () => {
  axios.get(`${CONSTANTS.FACTURAS_API_URL}/emisor/${user.value.nif}`).then(({ data: response }) => {
    if (response.statusCode === 200) {
      const ultimasFacturas = response.data.slice(-5)

      response.data.forEach(async (factura: any) => {
        if (factura.id_emisor !== factura.id_receptor) {
          const date = new Date(factura.fecha_emision)
          if (date.getFullYear() === new Date().getFullYear()) {
            const month = date.getMonth() + 1
            const facturaAcumulado = ingresos.value.get(month) + factura.precio_total
            ingresos.value.set(month, facturaAcumulado)
          }
        }
      })

      ultimasVentas.value = new Array()
      ultimasFacturas.forEach(async (factura: any) => {
        if (factura.id_emisor !== factura.id_receptor) {
          const { data: clienteResponse } = await axios.get(`${CONSTANTS.CLIENTES_API_URL}/${factura.id_receptor}`)
          ultimasVentas.value.push(formatVenta(factura,clienteResponse.data))
        }
      })
    }
  })
}

const formatVenta = (factura: any, cliente: any) => {
  return {
    nombreCliente: `${cliente.nombre} ${cliente.apellidos}`,
            direccion: `${cliente.direccion}, ${cliente.poblacion}, ${cliente.codigo_postal} ${cliente.provincia}, ${cliente.pais}`,
            nif: cliente.nif,
            email: cliente.correo_electronico,
            fecha: new Date(factura.fecha_emision).toLocaleDateString('en-GB'),
            importe: (`${factura.precio_total}`).replace('.',',')
          }
}

const ingresosMonth = computed(() => {
  const today = new Date()
  return ingresos.value.get(today.getMonth() + 1)
})
const gastosMonth = computed(() => {
  const today = new Date()
  return gastos.value.get(today.getMonth() + 1)
})
const beneficionsMonth = computed(() => {
  const monthToday = new Date().getMonth() + 1
  const ingMonth = ingresos.value.get(monthToday)
  const gastMonth = gastos.value.get(monthToday)
  return ingMonth && gastMonth ? ingMonth - gastMonth : 0
})

</script>

<template>
  <MDBRow start class="justify-content-center mb-5 mt-3">
    <MDBCol col="10">
      <SubHeader class="mb-4">
        <h2>Bienvenid@, {{ user.nombre }} </h2>
        <span>Aquí tienes un resumen de tu empresa</span>
      </SubHeader>
      <h4 class="pt-3">Resumen de este mes</h4>
      <div class="d-flex mt-3">
        <SummaryCard class="me-3" title="Ingresos" :amount="ingresosMonth" icon="money-bill-wave"></SummaryCard>
        <SummaryCard class="mx-3" title="Gastos" :amount="gastosMonth" icon="cart-arrow-down"></SummaryCard>
        <SummaryCard class="ms-3" title="Beneficios" :amount="beneficionsMonth" icon="piggy-bank"></SummaryCard>
      </div>
      <h4 class="mt-4">Resumen de este año</h4>
      <h4 class="mt-4">Últimas ventas</h4>
      <MDBTable hover class="align-middle mb-0 bg-white mt-4">
      <thead class="bg-light">
        <tr>
          <th>Nombre cliente</th>
          <th>Fecha de venta</th>
          <th>Correo electrónico</th>
          <th>Dirección de compra</th>
          <th>Importe compra</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(venta, index) in ultimasVentas" :key="index" style="cursor:pointer" >
          <td>{{ venta.nombreCliente }}</td>
          <td>{{ venta.fecha }}</td>
          <td>{{ venta.email }}</td>
          <td>{{ venta.direccion }}</td>
          <td>{{ venta.importe }} €</td>
        </tr>
      </tbody>
    </MDBTable>
    </MDBCol>
  </MDBRow>
</template>

<style lang="sass" scoped>
</style>