<template>
  <div class="relative w-full">
    <LayoutHeader />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { VendorService } from "~/services/vendor.service";
import { useAuthStore } from "~/store/auth.store";
import { useVendorStore } from "~/store/vendor.store";

const vendorStore = useVendorStore();

const authStore = useAuthStore();

onMounted(async () => {
  await vendorStore.getVendors();
  await VendorService.getVendors();
});
</script>

<style scoped></style>
