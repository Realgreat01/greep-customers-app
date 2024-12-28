<template>
  <div class="p-5">
    <BaseBreadCrumb :routes="routes" backType />
    <h1 class="my-5 ml-5 text-lg font-semibold md:text-2xl">Transfer</h1>
    <WalletTransfer />
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
definePageMeta({
  name: GP_ROUTES.WALLETS.TRANSFER,
});
useHead({
  title: "Wallet - Transfer",
});

const routes = ref([
  {
    title: "Wallet",
    route: { name: GP_ROUTES.WALLETS.OVERVIEW },
  },
  {
    title: "Transfer",
    route: { name: GP_ROUTES.WALLETS.TRANSFER },
  },
]);
</script>

<style></style>
