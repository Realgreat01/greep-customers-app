<template>
  <div class="hide-scrollbar relative flex">
    <LayoutSidebar
      class="sticky top-0 hidden !w-[257px] !min-w-[257px] !max-w-[257px] md:flex"
    />

    <div class="flex-1">
      <LayoutNavbar class="sticky top-0 z-10 hidden bg-white md:flex" />
      <div
        class="hide-scrollbar max-h-[calc(100vh-76px)] overflow-auto bg-white"
      >
        <slot class="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";
import { useInteractionStore } from "~/store/interactions.store";
import { useMessageStore } from "~/store/message.store";
import { useOrderStore } from "~/store/order.store";
import { usePaymentStore } from "~/store/payment.store";
import { useProductStore } from "~/store/product.store";
import { useUtilsStore } from "~/store/utils.store";
import { useVendorStore } from "~/store/vendor.store";

const vendorStore = useVendorStore();

const authStore = useAuthStore();
const paymentStore = usePaymentStore();
const productsStore = useProductStore();
const interactionsStore = useInteractionStore();
const messageStore = useMessageStore();
const orderStore = useOrderStore();

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
  await productsStore.getUserCartLinks();

  await messageStore.getChatHistory();

  await orderStore.getOrders();
});
</script>

<style scoped></style>
