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
  productos: Array<{idProducto: number, cantidad:number}>,

});
const productosMapeados = computed(() => {
  return props.productos?.map((producto:any) => mapProduct(producto))
})

const mapProduct = (producto: any) => {
  return {
        precioBase : producto.precio_unidad,
        precioVenta : Number(producto.precio_unidad * (producto.impuesto / 100 + 1)).toFixed(2),
        nombre : producto.nombre,
        cantidad : producto.cantidad,
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
        <td>{{ producto.precioBase }} €</td>
        <td>{{ producto.impuesto }} %</td>
        <td>{{ producto.precioVenta }} €</td>
        <td>{{ producto.cantidad }}</td>
      </tr>
    </tbody>
  </MDBTable>
</template>

<style lang="scss" scoped></style>