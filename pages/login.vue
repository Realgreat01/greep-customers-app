<template>
  <AuthLogin />
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
definePageMeta({
  layout: "auth",
  name: GP_ROUTES.LOGIN,
  pageTitle: "Welcome",
  titleHint: "Login to continue",
});
</script>

<style scoped></style>
