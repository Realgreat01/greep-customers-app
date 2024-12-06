<template>
  <div class="relative w-full">
    <LayoutHeader />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { VendorService } from "~/services/vendor.service";
import { useAuthStore } from "~/store/auth.store";
import { useUtilsStore } from "~/store/utils.store";
import { useVendorStore } from "~/store/vendor.store";

const vendorStore = useVendorStore();

const authStore = useAuthStore();
const utilsStore = useUtilsStore();

onBeforeMount(async () => {
  await vendorStore.getVendors();
  await utilsStore.getExchangeRate();
});
</script>

<style scoped></style>
