<template>
  <div class="p-5">
    <BaseBreadCrumb :routes="routes" backType />
    <h1 class="m-5 mt-0 text-lg font-semibold md:text-2xl">Deposit</h1>
    <WalletDeposit />
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
import { usePaymentStore } from "~/store/payment.store";

definePageMeta({
  name: GP_ROUTES.WALLETS.DEPOSIT,
});
useHead({
  title: "Wallet - Deposit",
});

const routes = ref([
  {
    title: "Wallet",
    route: { name: GP_ROUTES.WALLETS.OVERVIEW },
  },
  {
    title: "Deposit",
    route: { name: GP_ROUTES.WALLETS.DEPOSIT },
  },
]);
</script>

<style></style>
