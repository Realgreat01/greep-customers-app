<template>
  <UContainer
    class="hide-scrollbar relative flex"
    :ui="{
      base: 'mx-auto max-w-[1440px] overflow-scroll hide-scrollbar',
      padding: 'px-0 sm:px-0 lg:px-0',
      constrained: 'max-w-[1440px]',
    }"
  >
    <LayoutSidebar
      class="sticky top-0 hidden !w-[257px] !min-w-[257px] !max-w-[257px] md:flex"
    />

    <div class="flex-1">
      <LayoutNavbar class="sticky top-0 z-10 hidden bg-white md:flex" />

      <div
        class="hide-scrollbar max-h-[calc(100vh-76px)] !max-w-[calc(100vw-257px)] overflow-scroll p-5"
      >
        <slot />
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";
import { useInteractionStore } from "~/store/interactions.store";
import { usePaymentStore } from "~/store/payment.store";
import { useProductStore } from "~/store/product.store";
import { useUtilsStore } from "~/store/utils.store";
import { useVendorStore } from "~/store/vendor.store";

const vendorStore = useVendorStore();

const authStore = useAuthStore();
const paymentStore = usePaymentStore();
const productsStore = useProductStore();
const interactionsStore = useInteractionStore();

onBeforeMount(async () => {
  await vendorStore.getVendors();
  await vendorStore.getFoodVendors();
  await vendorStore.getNearByFoodVendors();
  await vendorStore.getMarketVendors();
  await vendorStore.getNearByMarketVendors();

  await paymentStore.getExchangeRate();

  await interactionsStore.getProductTags();
  await interactionsStore.getProductFoodsTags();
  await interactionsStore.getProductItemsTags();

  await productsStore.getProducts();
  await productsStore.getMostSoldProducts();
  await productsStore.getLatestProducts();
});
</script>

<style scoped></style>
