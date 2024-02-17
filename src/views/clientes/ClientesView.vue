<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { MDBTable, MDBBtn, MDBBadge, MDBIcon } from "mdb-vue-ui-kit";
import { useStore } from "vuex";

const titles = ref([
  "Nombre",
  "NIF",
  "Correo",
  "Dirección",
  "Acciones",
]);
const clientes = ref([
  {
    nif: "1",
    nombre: "13/10/2024",
    correo: "24/11/2024",
    direccion: "546,78",
  },
  {
    nif: "2",
    nombre: "13/10/2024",
    correo: "24/11/2024",
    direccion: "546,78",
  },
  {
    nif: "3",
    nombre: "13/10/2024",
    correo: "24/11/2024",
    direccion: "546,78",
  },
]);

const store = useStore();
const userName = ref("");

onMounted(() => {
  userName.value = store.getters.getLoggedUser;
});

const edit = (nif) => {
  console.log("editar cliente", nif);
};

const remove = (nif) => {
  console.log("eliminar cliente", nif);
};
</script>

<template>
  <section>
    <p>Clientes</p>
    <MDBBtn color="primary">
      <MDBIcon icon="plus" class="me-2"></MDBIcon>Nuevo Cliente
    </MDBBtn>
    <MDBTable class="align-middle mb-0 bg-white mt-4">
      <thead class="bg-light">
        <tr>
          <th v-for="(title, index) in titles" :key="index">{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cliente, index) in clientes" :key="index">
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.nif }}</td>
          <td>{{ cliente.correo }}</td>
          <td>{{ cliente.direccion }}</td>
          <td>
            <div class="d-flex">
              <MDBBtn
                color="link"
                size="sm"
                floating
                @click="edit(cliente.nif)"
              >
                <MDBIcon icon="pen"></MDBIcon>
              </MDBBtn>
              <MDBBtn
                color="link"
                size="sm"
                floating
                @click="remove(cliente.nif)"
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