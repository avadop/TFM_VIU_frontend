<script setup lang="ts">
import { onMounted, ref } from "vue";
import { MDBTable, MDBBtn, MDBIcon } from "mdb-vue-ui-kit";
import { useStore } from "vuex";
import axios from 'axios'
import CONSTANTS from '../../constants'
import ProductModal from './ProductForm.vue'

const titles = ref([
  "Nombre",
  "Precio base",
  "Impuesto aplicado",
  "Precio de venta",
  "Stock",
  "Acciones"
]);

const store = useStore();
const userId = ref("");
const productos = ref(new Array())

const openProductModal = ref(false)
const idEditProduct = ref(null)
const editProduct = ref(false)

onMounted(() => {
  userId.value = store.getters.getLoggedUser.nif;
  getProducts()
});

const getProducts = () => {
  axios.get(`${CONSTANTS.PRODUCTOS_API_URL}/usuario/${userId.value}`).then(({ data: response }: any) => {
    productos.value = new Array()
    if (response.statusCode === 200) {
      response.data.forEach((producto: any) => {
        productos.value.push(formatProducto(producto))
      })
    }
  })
}

const formatProducto = (producto: any) => {
  return {
    nombre: producto.nombre,
    precioBase: producto.precio_unidad,
    impuesto: `${producto.impuesto} %`,
    precioVenta: Number(producto.precio_unidad * (producto.impuesto / 100 + 1)).toFixed(2),
    stock: producto.stock
  }
}

const edit = (idProducto: number) => {
  editProduct.value = true
  openProductModal.value = true
  idEditProduct.value = idProducto
};

const remove = (idProducto: number) => {
    axios.delete(`${CONSTANTS.PRODUCTOS_API_URL}/${idProducto}`).then(({data}:any) => {
    if(data.statusCode === 200) {
      getProducts()
    }
  })
};

const newClient = () => {
  openProductModal.value = true
  editProduct.value = false
  idEditProduct.value = null
}

const closeProductModal = (reload: Boolean) => {
  openProductModal.value = false
  editProduct.value = false
  idEditProduct.value = ""
  if(reload) {
    getProducts()
  }
}
</script>

<template>
  <section>
    <p>Productos</p>
    <MDBBtn color="primary" @click="newClient">
      <MDBIcon icon="plus" class="me-2"></MDBIcon>Nuevo producto
    </MDBBtn>
    <ProductModal :isModalOpen="openProductModal" :idEditProduct="idEditProduct" :isEdit="editProduct" @closeModal="closeProductModal"/>
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
              <MDBBtn color="link" size="sm" floating @click="edit(producto.idProducto)">
                <MDBIcon icon="pen"></MDBIcon>
              </MDBBtn>
              <MDBBtn color="link" size="sm" floating @click="remove(producto.idProducto)">
                <MDBIcon icon="trash" style="color: #C21807;"></MDBIcon>
              </MDBBtn>
            </div>
          </td>
        </tr>
      </tbody>
    </MDBTable>
  </section>
</template>


<style lang="scss" scoped></style>