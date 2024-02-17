<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { MDBTable, MDBBtn, MDBBadge, MDBIcon } from "mdb-vue-ui-kit";
import { useStore } from "vuex";
import CONSTANTS from '../../constants'
import axios from 'axios'

const titles = ref([
  "ID",
  "Fecha de emisión",
  "Fecha de vencimiento",
  "Importe total",
  "Estado",
  "Acciones",
]);
const store = useStore();
const userId = ref("");

const gastos = ref(new Array())

onMounted(async () => {
  userId.value = store.getters.getLoggedUser.nif;

  axios.get(`${CONSTANTS.FACTURAS_API_URL}/receptor/${userId.value}`).then(({ data: response }:any) => {
    if (response.statusCode === 200) {
      response.data.forEach(async (gasto: any) => {
        gastos.value.push({
          idGasto: gasto.id_factura,
          fechaEmision: gasto.fecha_emision,
          fechaVencimiento: gasto.fecha_vencimiento,
          precioTotal: `${gasto.precio_total} €`,
          estadoPago: formatEstadoPago(gasto.estado_pago)
        })
      })
    }
  })
});

const formatEstadoPago = (estadoPago: String) => {
  if (estadoPago === 'pagado')
    return { badge: 'success', text: 'Pagado' }
  else if (estadoPago === 'vencido')
    return { badge: 'danger', text: 'Vencido' }
  else return { badge: 'warning', text: 'Pendiente' }

}

const edit = (idGasto: Number) => {
  console.log("editar gasto", idGasto);
};

const remove = (idGasto: Number) => {
  console.log("eliminar gasto", idGasto);
};
</script>

<template>
  <section>
    <p>Gastos</p>
    <MDBBtn color="primary">
      <MDBIcon icon="plus" class="me-2"></MDBIcon>Nuevo Gasto
    </MDBBtn>
    <MDBTable class="align-middle mb-0 bg-white mt-4">
      <thead class="bg-light">
        <tr>
          <th v-for="(title, index) in titles" :key="index">{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(gasto, index) in gastos" :key="index">
          <td>{{ userId }}{{ gasto.idGasto }}</td>
          <td>{{ gasto.fechaEmision }}</td>
          <td>{{ gasto.fechaVencimiento }}</td>
          <td>{{ gasto.precioTotal }}</td>
          <td>
            <MDBBadge :badge="gasto.estadoPago.badge" pill class="d-inline">{{
              gasto.estadoPago.text
            }}</MDBBadge>
          </td>
          <td>
            <div class="d-flex">
              <MDBBtn
                color="link"
                size="sm"
                floating
                @click="edit(gasto.idGasto)"
              >
                <MDBIcon icon="pen"></MDBIcon>
              </MDBBtn>
              <MDBBtn
                color="link"
                size="sm"
                floating
                @click="remove(gasto.idGasto)"
              >
                <MDBIcon icon="trash" style="color: #c21807"></MDBIcon>
              </MDBBtn>
            </div>
          </td>
        </tr>
      </tbody>
    </MDBTable>
  </section>
</template>


<style lang="scss" scoped>
</style>