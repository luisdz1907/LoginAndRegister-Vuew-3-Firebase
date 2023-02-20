<script setup>
import { useUserStore } from "../store/user";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
const userStore = useUserStore();
onAuthStateChanged(auth, (user) => {
  console.log(user);
});
</script>
<template>
  <h1>Home - {{ userStore.userData }}</h1>
</template>

<style lang="scss" scoped></style>
