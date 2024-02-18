<script setup lang="ts">
import { onMounted, ref } from "vue";
import { MDBTable, MDBBtn, MDBIcon } from "mdb-vue-ui-kit";
import { useStore } from "vuex";
import CONSTATNS from '../../constants'
import axios from 'axios'
import NewClientModal from './NewClientForm.vue'

const titles = ref([
  "Nombre",
  "NIF",
  "Correo",
  "Dirección",
  "Acciones",
]);

const store = useStore();
const userId = ref("");

const clientes = ref(new Array())
const openClientModal = ref(false)
const editClient = ref(false)
const nifEditClient = ref("")

onMounted(() => {
  userId.value = store.getters.getLoggedUser.nif;
  getClients()
});

const getClients = () => {
  clientes.value = new Array()
  axios.get(`${CONSTATNS.CLIENTES_API_URL}/usuario/${userId.value}`).then(({ data: response }: any) => {
    if (response.statusCode === 200) {
      response.data.forEach((cliente: any) => {
        if (cliente.nif != userId.value) {
          clientes.value.push(formatCliente(cliente))
        }
      });
    }
  })
}

const formatCliente = (cliente: any) => {
  return {
    nombre: `${cliente.nombre} ${cliente.apellidos}`,
    nif: cliente.nif,
    correo: cliente.correo_electronico,
    direccion: `${cliente.direccion}, ${cliente.poblacion}, ${cliente.codigo_postal}, ${cliente.provincia}, ${cliente.pais}`
  }
}

const edit = (nif: string) => {
  console.log("editar cliente", nif);
  editClient.value = true
  openClientModal.value = true
  nifEditClient.value = nif
};

const remove = (nif: string) => {
  axios.delete(`${CONSTATNS.CLIENTES_API_URL}/${nif}`).then(({data}:any) => {
    if(data.statusCode === 200) {
      getClients()
    }
  })
};

const newClient = () => {
  openClientModal.value = true
  editClient.value = false
  nifEditClient.value = ""
}

const closeClientModal = (reload: Boolean) => {
  openClientModal.value = false
  editClient.value = false
  nifEditClient.value = ""
  if(reload) {
    getClients()
  }
}
</script>

<template>
  <section>
    <p>Clientes</p>
    <MDBBtn color="primary" @click="newClient">
      <MDBIcon icon="plus" class="me-2" ></MDBIcon>Nuevo Cliente
    </MDBBtn>
    <NewClientModal :isModalOpen="openClientModal" :nifEditClient="nifEditClient" :isEdit="editClient" @closeModal="closeClientModal"/>
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
              <MDBBtn color="link" size="sm" floating @click="edit(cliente.nif)">
                <MDBIcon icon="pen"></MDBIcon>
              </MDBBtn>
              <MDBBtn color="link" size="sm" floating @click="remove(cliente.nif)">
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