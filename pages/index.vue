<template>
  <div>
    <VendorList />
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";

definePageMeta({
  name: GP_ROUTES.DASHBOARD.HOME,
});
</script>

<style scoped></style>
