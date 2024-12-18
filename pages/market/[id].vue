<template>
  <div>
    <VendorStore />
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
import { useUtilsStore } from "~/store/utils.store";

definePageMeta({
  name: GP_ROUTES.MARKET.STORE,
});

const { remarksModal, orderDetailsModal } = storeToRefs(useUtilsStore());
</script>

<style scoped></style>
