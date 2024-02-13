<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
  import {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
  } from 'mdb-vue-ui-kit';
</script>

<template>
  <header>
    <!-- Navbar -->
    <MDBNavbar expand="lg" light bg="white" container position="sticky">
      <MDBNavbarToggler
        target="#navbarExample04"
        @click="collapse4 = !collapse4"
      ></MDBNavbarToggler>
      <MDBCollapse id="#navbarExample04" v-model="collapse4">
        <MDBNavbarNav class="mb-2 mb-lg-0">
          <MDBNavbarItem to="/" active> Home </MDBNavbarItem>
          <MDBNavbarItem to="/facturas"> Facturas </MDBNavbarItem>
          <MDBNavbarItem to="/gastos"> Gastos </MDBNavbarItem>
          <MDBNavbarItem to="/clientes"> Clientes </MDBNavbarItem>
          <MDBNavbarItem to="/productos"> Productos </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
