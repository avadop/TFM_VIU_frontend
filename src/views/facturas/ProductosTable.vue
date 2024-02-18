<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { MDBTable } from "mdb-vue-ui-kit";
import { useStore } from "vuex";
import axios from "axios";
import CONSTANTS from "../../constants";

const titles = ref([
  "Nombre",
  "Precio base",
  "Impuesto aplicado",
  "Precio de venta",
  "Cantidad",
]);
const props = defineProps({
  productos: Array<{idProducto, cantidad}>,
});
const productosMapeados = ref(new Array());

watch(() => props.productos,() => {
    props.productos.forEach((producto: any) => {
      axios.get(`${CONSTANTS.PRODUCTOS_API_URL}/${producto.idProducto}`)
        .then(({ data: response }: any) => {
          if (response.statusCode === 200) {
            productosMapeados.value.push(mapProduct(response.data, producto.cantidad));
          }
        });
    });
  }
);

const mapProduct = (producto: any, cantidad:number) => {
  return {
        precioBase : producto.precio_unidad,
        precioVenta : Number(producto.precio_unidad * (producto.impuesto / 100 + 1)).toFixed(2),
        nombre : producto.nombre,
        cantidad : cantidad,
        impuesto : producto.impuesto,
  }
          
};
</script>

<template>
  <MDBTable class="align-middle mb-0 bg-white mt-4">
    <thead class="bg-light">
      <tr>
        <th v-for="(title, index) in titles" :key="index">{{ title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(producto, index) in productosMapeados" :key="index">
        <td>{{ producto.nombre }}</td>
        <td>{{ producto.precioBase }}</td>
        <td>{{ producto.impuesto }}</td>
        <td>{{ producto.precioVenta }}</td>
        <td>{{ producto.cantidad }}</td>
      </tr>
    </tbody>
  </MDBTable>
</template>

<style lang="scss" scoped></style>