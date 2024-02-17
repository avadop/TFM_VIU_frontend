<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { MDBTable, MDBBtn, MDBBadge, MDBIcon } from "mdb-vue-ui-kit";
import { useStore } from "vuex";

const titles = ref([
  "ID",
  "Fecha de emisión",
  "Fecha de vencimiento",
  "Importe total",
  "Estado",
  "Acciones",
]);
const gastos = ref([
  {
    idGasto: "1",
    fechaEmision: "13/10/2024",
    fechaVencimiento: "24/11/2024",
    precioTotal: "546,78",
    estadoPago: {
      estado: "pendiente",
      badge: "warning",
      text: "Pendiente",
    },
  },
  {
    idGasto: "2",
    fechaEmision: "13/10/2024",
    fechaVencimiento: "24/11/2024",
    precioTotal: "546,78",
    estadoPago: {
      estado: "pagado",
      badge: "success",
      text: "Pagado",
    },
  },
  {
    idGasto: "3",
    fechaEmision: "13/10/2024",
    fechaVencimiento: "24/11/2024",
    precioTotal: "546,78",
    estadoPago: {
      estado: "vencido",
      badge: "danger",
      text: "Vencido",
    },
  },
]);

const store = useStore();
const userName = ref("");

onMounted(() => {
  userName.value = store.getters.getLoggedUser;
});

const edit = (idGasto) => {
  console.log("editar gasto", idGasto);
};

const remove = (idGasto) => {
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
          <td>{{ userName }}{{ gasto.idGasto }}</td>
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