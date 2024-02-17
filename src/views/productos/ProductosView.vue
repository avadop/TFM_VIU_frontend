<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { MDBTable, MDBBtn, MDBBadge, MDBIcon } from "mdb-vue-ui-kit";
import { useStore } from "vuex";

const titles = ref([
  "Nombre",
  "Precio base",
  "Impuesto aplicado",
  "Precio de venta",
  "Stock",
  "Acciones"
]);
const productos = ref([
  {
    nombre: "Producto 1",
    precioBase: "99.18 €",
    impuesto: "21%",
    precioVenta: "120 €",
    stock : 17
  },
  {
    nombre: "Producto 2",
    precioBase: "99.18 €",
    impuesto: "21%",
    precioVenta: "120 €",
    stock : 24
  },
  {
    nombre: "Producto 3",
    precioBase: "99.18 €",
    impuesto: "21%",
    precioVenta: "120 €",
    stock : 172
  },
]);

const store = useStore();
const userName = ref("");

onMounted(() => {
  userName.value = store.getters.getLoggedUser;
});

const edit = (idProducto) => {
  console.log("editar producto", idProducto);
};

const remove = (idProducto) => {
  console.log("eliminar producto", idProducto);
};
</script>

<template>
  <section>
    <p>Productos</p>
    <MDBBtn color="primary">
      <MDBIcon icon="plus" class="me-2"></MDBIcon>Nuevo producto
    </MDBBtn>
    <MDBTable class="align-middle mb-0 bg-white mt-4">
      <thead class="bg-light">
        <tr>
          <th v-for="(title, index) in titles" :key="index">{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(producto, index) in productos" :key="index">
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.precioBase }}</td>
          <td>{{ producto.impuesto }}</td>
          <td>{{ producto.precioVenta }}</td>
          <td>{{ producto.stock }}</td>
          <td>
            <div class="d-flex">
              <MDBBtn
                color="link"
                size="sm"
                floating
                @click="edit(producto.idProducto)"
              >
                <MDBIcon icon="pen"></MDBIcon>
              </MDBBtn>
              <MDBBtn
                color="link"
                size="sm"
                floating
                @click="remove(producto.idProducto)"
              >
                <MDBIcon icon="trash" style="color: #C21807;"></MDBIcon>
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