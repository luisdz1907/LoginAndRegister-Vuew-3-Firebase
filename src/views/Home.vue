<script setup>
import { useUserStore } from "../store/user";
import { useDatabaseStore } from "../store/databse";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { ref } from "vue";
const userStore = useUserStore();
const databaseStore = useDatabaseStore();

const url = ref("https://url.com.co");
onAuthStateChanged(auth, (user) => {
  // console.log(user);
});

const handleSubmit = () => {
  databaseStore.addUrl(url.value)
};
const handleDelete = (id) => {
  databaseStore.deleteUrl(id)
};
databaseStore.getUrls();
</script>
<template>

  <form class="w-100 my-3" @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label class="form-label">Url</label>
      <input v-model.trim="url" type="text" class="form-control" />
    </div>

    <button
      type="submit"
      class="btn btn-primary d-block w-100 d-flex align-content-center justify-content-center gap-2 fs-5"
    >
      Guardar
    </button>
  </form>

  <!-- <h1>Home - {{ userStore.userData }}</h1> -->
  <div
    class="d-flex justify-content-center mt-5"
    v-if="databaseStore.loadingDoc"
  >
    <div class="spinner-border" role="status"></div>
  </div>
  <ul v-if="!databaseStore.loadingDoc" class="mt-5">
    <li v-for="item in databaseStore.documents" :key="item.id">
      {{ item.name }}
      <button @click="handleDelete(item.id)"  type="button" class="btn btn-primary">Eliminar</button>

    </li>
  </ul>
</template>

<style scoped>
li{
  display: flex;
  gap: 20px;
  margin-top: 10px;
}
</style>
