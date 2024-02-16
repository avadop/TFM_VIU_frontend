<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import {
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
  MDBIcon,
  MDBBtn,
} from "mdb-vue-ui-kit";
import { useStore } from "vuex";
import { computed } from "vue";
import { ref } from "vue";
const collapse = ref(false);

const store = useStore();
const router = useRouter();
const loggedUser = computed(() => store.getters.getLoggedUser);

const route = useRoute();
const path = computed(() => route.path);

const logout = () => {
  store.commit("removeLoggedUser");
  router.push("/");
};
</script>

<template>
  <header>
    <!-- Navbar -->
    <MDBNavbar expand="lg" light bg="white" container position="sticky">
      <MDBNavbarToggler
        target="#navbar"
        @click="collapse = !collapse"
      ></MDBNavbarToggler>
      <img class="main__img" src="./assets/logo.jpg" />
      <MDBCollapse id="#navbar" v-model="collapse" v-if="loggedUser">
        <MDBNavbarNav class="mb-2 mb-lg-0">
          <MDBNavbarItem
            class="main__navbar--spacing"
            to="/"
            :active="path === '/'"
          >
            Home
          </MDBNavbarItem>
          <MDBNavbarItem
            class="main__navbar--spacing"
            to="/facturas"
            :active="path === '/facturas'"
          >
            Facturas
          </MDBNavbarItem>
          <MDBNavbarItem
            class="main__navbar--spacing"
            to="/gastos"
            :active="path === '/gastos'"
          >
            Gastos
          </MDBNavbarItem>
          <MDBNavbarItem
            class="main__navbar--spacing"
            to="/clientes"
            :active="path === '/clientes'"
          >
            Clientes
          </MDBNavbarItem>
          <MDBNavbarItem
            class="main__navbar--spacing"
            to="/productos"
            :active="path === '/productos'"
          >
            Productos
          </MDBNavbarItem>
        </MDBNavbarNav>
        <div class="me-4">
          <span class="me-4">{{ loggedUser }}</span>
          <MDBBtn color="danger" floating @click="logout">
            <MDBIcon size="lg" icon="power-off"></MDBIcon>
          </MDBBtn>
        </div>
      </MDBCollapse>
    </MDBNavbar>
  </header>
  <main class="main__container shadow-2">
    <RouterView />
  </main>
</template>

<style lang="sass" scoped>
.navbar
  padding: 0

.main
  &__img
    height: 4em

  &__navbar
    &--spacing
      margin-left: 1em

  &__container
    margin: auto
    margin-top: 1em
    width: 80%
    background-color: white
    border-radius: 0.15em
    min-height: 5em
    padding: 1.5em 2em
    min-height: 85%
</style>
