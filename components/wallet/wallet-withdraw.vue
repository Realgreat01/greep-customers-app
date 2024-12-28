<template>
  <UCard class="mx-auto lg:w-2/5">
    <h2 class="mb-4 text-lg font-semibold">Add Details</h2>

    <div class="flex-center my-4 flex flex-col gap-1">
      <h2 class="text-center text-gray-500">Balance</h2>
      <h2 class="text-4xl font-semibold">
        {{
          gpNumbers.formatCurrency(
            wallet.balance.amount,
            wallet.balance.currency,
          )
        }}
      </h2>
    </div>

    <div class="mb-5">
      <h2 class="">Amount</h2>
      <div class="flex w-full gap-x-2">
        <USelectMenu
          v-model="selectedCurrency"
          :options="supportedCurrencies"
          size="xl"
        >
          <template #label>
            <h2 class="flex items-center gap-x-2.5">
              <span class="text-sm">
                {{ selectedCurrency.currency }}
              </span>
              <UIcon :name="selectedCurrency.flag" class="h-4 w-4" />
            </h2>
          </template>

          <template #option="{ option: currency }">
            <h2 class="flex items-center gap-x-2.5">
              <span class="">
                {{ currency.currency }}
              </span>
              <UIcon :name="currency.flag" class="h-4 w-4" />
            </h2>
          </template>
        </USelectMenu>
        <UInput
          class="flex-1"
          size="xl"
          :disabled="!isLoggedIn"
          type="number"
          v-model.number="withdrawAmount"
          placeholder="Enter amount"
        />
      </div>
    </div>

    <WalletPaymentMethod />

    <UButton
      class="mt-4 rounded-lg"
      color="green"
      size="xl"
      block
      :disabled="!isLoggedIn && !withdrawAmount"
      >Withdraw</UButton
    >
  </UCard>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";
import { usePaymentStore } from "~/store/payment.store";

const { isLoggedIn } = storeToRefs(useAuthStore());
const withdrawAmount = ref(0);
const { supportedCurrencies, wallet } = storeToRefs(usePaymentStore());
const selectedCurrency = ref(supportedCurrencies.value[0]);
</script>

<style scoped></style>
