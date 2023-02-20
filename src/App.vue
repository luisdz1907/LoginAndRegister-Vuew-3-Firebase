<script setup>
import { RouterView } from "vue-router";
import { useUserStore} from './store/user'

const userStore = useUserStore();
</script>
<template>
  <div>
    <nav class="navbar navbar-expand-sm" style="background-color: #e3f2fd">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="./assets/piniaLogo.svg" alt="" />
        </a>
        <button
          class="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
          <ul class="navbar-nav me-auto mt-2 mt-lg-0">
            <li class="nav-item" v-if="userStore.userData">
              <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="login" v-if="!userStore.userData">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="register" v-if="!userStore.userData">Register</a>
            </li>
            <li class="nav-item">
              <a @click="userStore.logoutUser" class="nav-link">Cerrar sesion</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
img {
  width: 25px;
}
</style>
