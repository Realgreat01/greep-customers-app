<template>
  <UCard class="mx-auto lg:w-2/5">
    <div class="flex-center mb-5 flex flex-col gap-2">
      <UButton
        :ui="{ rounded: 'rounded-full' }"
        :padded="false"
        class="flex h-10 w-10 items-center justify-center bg-green-500 hover:bg-green-500"
      >
        <UIcon name="i-icon-checkbox-tick" class="h-8 w-8 text-white" />
      </UButton>

      <h2 class="">Transfer Successful</h2>

      <h2 class="text-3xl font-semibold">
        {{ gpNumbers.formatCurrency(amount.amount, amount.currency) }}
      </h2>
    </div>
    <div class="grid gap-5 rounded-lg border p-5">
      <div v-for="(value, key) in recepientDetails">
        <div class="mb-3 flex items-center justify-between text-sm">
          <h2 class="capitalize text-gray-500">
            {{ key }}
          </h2>
          <h2 class="">
            {{ value }}
          </h2>
        </div>

        <UDivider />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { Price } from "~/types/product";

const props = defineProps({
  receipient: {
    type: Object as PropType<{
      name: string;
      username: string;
      picture: string;
    }>,
    required: true,
  },
  amount: {
    type: Object as PropType<Price>,
    required: true,
  },
});
function generateTransactionId() {
  return "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

const recepientDetails = ref({
  "Recepient Username": props.receipient.username,
  Note: "Have fun",
  "Transaction ID": generateTransactionId(),
  Time: `${gpDates.getReadableDate(new Date())} ● ${gpDates.getTime(new Date())}`,
});
</script>

<style scoped></style>
