<template>
  <div>
    <VendorStore />
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";

definePageMeta({
  name: GP_ROUTES.DASHBOARD.VENDOR_STORE,
});
</script>

<style scoped></style>
