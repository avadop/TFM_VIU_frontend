<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { MDBTable, MDBBtn, MDBBadge, MDBIcon } from "mdb-vue-ui-kit";
import { useStore } from "vuex";

const titles = ref([
  "ID",
  "Nombre",
  "Fecha de emisión",
  "Fecha de vencimiento",
  "Importe total",
  "Estado",
  "Acciones",
]);
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
]);

const store = useStore();
const userName = ref("");

onMounted(() => {
  userName.value = store.getters.getLoggedUser;
});

const edit= (idFactura) => {
  console.log("editar factura", idFactura);
}

const remove= (idFactura) => {
  console.log("eliminar factura", idFactura);
}

</script>

<template>
  <section>
    <p>Facturas</p>
    <MDBTable class="align-middle mb-0 bg-white">
      <thead class="bg-light">
        <tr>
          <th v-for="(title, index) in titles" :key="index">{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(factura, index) in facturas" :key="index">
          <td>{{ userName }}-{{ factura.idFactura }}</td>
          <td>Nombre recibidor factura</td>
          <td>{{ factura.fechaEmision }}</td>
          <td>{{ factura.fechaVencimiento }}</td>
          <td>{{ factura.precioTotal }}</td>
          <td>
            <MDBBadge :badge="factura.estadoPago.badge" pill class="d-inline">{{factura.estadoPago.text}}</MDBBadge>
          </td>
          <td >
            <div class="d-flex">
            <MDBBtn color="link" size="sm" floating @click="edit(factura.idFactura)">
              <MDBIcon icon="pen"></MDBIcon>
            </MDBBtn>
            <MDBBtn color="link" size="sm" floating @click="remove(factura.idFactura)">
              <MDBIcon icon="trash"></MDBIcon>
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