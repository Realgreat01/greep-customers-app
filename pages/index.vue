<template>
  <VendorList />
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
import { useUtilsStore } from "~/store/utils.store";

definePageMeta({
  name: GP_ROUTES.DASHBOARD.HOME,
});

const { orderDetailsModal, remarksModal } = storeToRefs(useUtilsStore());

const completedOrder = () => {
  orderDetailsModal.value = false;
  remarksModal.value = true;
};
</script>

<style scoped></style>
