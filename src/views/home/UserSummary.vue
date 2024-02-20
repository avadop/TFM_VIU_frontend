<script setup lang="ts">
import { MDBInput, MDBBtn, MDBRow, MDBCol } from "mdb-vue-ui-kit";
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import SubHeader from "../../components/SubHeader.vue";
import SummaryCard from "../../components/SummaryCard.vue";
import axios from 'axios'
import CONSTANTS from '../../constants'

const store = useStore()
const router = useRouter()
const user = ref({ nombre: "", nif: "" });

const ingresos = ref(new Map<number, number>())
const gastos = ref(new Map<number, number>())

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
      response.data.forEach(async (factura: any) => {
        //const { data: clienteResponse } = await axios.get(`${CONSTANTS.CLIENTES_API_URL}/${factura.id_receptor}`)
        //if(clienteResponse.data.nif !== userId.value) {
        //  facturas.value.push(formatFactura(factura, clienteResponse.data))
        //}
        if (factura.id_emisor !== factura.id_receptor) {
          //ingresos.value = ingresos.value + factura.precio_total
          const date = new Date(factura.fecha_emision)
        if (date.getFullYear() === new Date().getFullYear()) {
          const month = date.getMonth() + 1
          const facturaAcumulado = ingresos.value.get(month) + factura.precio_total
          ingresos.value.set(month, facturaAcumulado)
        }
        }
      })

    }
  })
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
  const monthToday = new Date().getMonth() +1
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
    </MDBCol>
  </MDBRow>
</template>

<style lang="sass" scoped>
</style>