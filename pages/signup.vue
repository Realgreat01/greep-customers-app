<template>
  <AuthSignup />
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
definePageMeta({
  name: GP_ROUTES.REGISTER,
  layout: "auth",
  pageTitle: "Sign Up",
  titleHint: "Become an Ambassador today on Greep",
});
</script>
