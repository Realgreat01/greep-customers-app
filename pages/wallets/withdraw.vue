<template>
  <div class="p-5">
    <BaseBreadCrumb :routes="routes" backType />
    <h1 class="m-5 mt-2 text-lg font-semibold md:text-2xl">Withdraw</h1>
    <WalletWithdraw />
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
definePageMeta({
  name: GP_ROUTES.WALLETS.WITHDRAW,
});
useHead({
  title: "Wallet - Withdraw",
});

const routes = ref([
  {
    title: "Wallet",
    route: { name: GP_ROUTES.WALLETS.OVERVIEW },
  },
  {
    title: "Withdraw",
    route: { name: GP_ROUTES.WALLETS.WITHDRAW },
  },
]);
</script>

<style></style>
