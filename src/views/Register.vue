<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const email = ref("luis@gmail.com");
const password = ref("luis1907");
password;
const handleSubmit = async () => {
  if (!email.value || !password.value) {
    alert("Porfa Complete Los Campos");
  }
  await userStore.registerUser(email.value, password.value).then((_resp) => {
    router.push("/");
  });
};
</script>
<template>
  <h1 class="text-center mt-3">Register</h1>
  <form class="w-100" @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label class="form-label">Email</label>
      <input v-model.trim="email" type="email" class="form-control" />
    </div>
    <div class="mb-3">
      <label class="form-label">Password</label>
      <input v-model.trim="password" type="password" class="form-control" />
    </div>

    <button
      type="submit"
      :disabled="userStore.loadingUser"
      class="btn btn-primary d-block w-100 d-flex align-content-center justify-content-center gap-2 fs-5"
    >
      Registrar
      <div class="text-center" v-if="userStore.loadingUser">
        <div class="spinner-border" role="status"></div>
      </div>
    </button>
  </form>
</template>

<style scoped></style>
