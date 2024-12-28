<template>
  <UCard class="mx-auto lg:w-2/5" v-if="!showTransferSummary">
    <div class="">
      <h2 class="mb-4 text-lg font-semibold">Add Details</h2>

      <div class="flex-center flex flex-col">
        <UAvatar :src="receipient.picture" size="xl" :alt="receipient.name" />
        <h2 class="">{{ receipient.name }}</h2>
        <h2 class="text-xs text-gray-400">@{{ receipient.username }}</h2>
      </div>

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

      <div class="my-5">
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
            v-model.number="transferAmount"
            placeholder="Enter amount"
          />
        </div>
      </div>

      <div class="grid gap-4">
        <div class="flex gap-x-4" v-for="transaction in recentTransactions">
          <UButton
            icon="i-icon-wallet-transfer"
            variant="ghost"
            color="green"
            class="rounded-full ring-1 ring-[#00969640]"
          />

          <div class="">
            <h2 class="">Sent to {{ transaction.username }}</h2>

            <h2 class="text-xs text-gray-400">
              {{ gpDates.getReadableDate(transaction.timeStamp) }} ●
              {{ gpDates.getTime(transaction.timeStamp) }}
            </h2>
          </div>
          <h2 class="ml-auto text-sm">
            {{
              gpNumbers.formatCurrency(
                transaction.amount.amount,
                transaction.amount.currency,
              )
            }}
          </h2>
        </div>
      </div>
    </div>

    <UButton
      class="mt-4 rounded-lg"
      color="green"
      size="xl"
      block
      @click="sendMoney"
      :disabled="!isLoggedIn || transferAmount < 1"
      >Send Money</UButton
    >
  </UCard>

  <WalletTransferSummary
    v-else
    :receipient="receipient"
    :amount="{ amount: transferAmount, currency: selectedCurrency.currency }"
  />
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";
import { usePaymentStore } from "~/store/payment.store";
import { Currency } from "~/types/enums";

defineProps({
  receipient: {
    type: Object as PropType<{
      name: string;
      username: string;
      picture: string;
    }>,
    required: true,
  },
});

const { supportedCurrencies, wallet } = storeToRefs(usePaymentStore());
const { isLoggedIn } = storeToRefs(useAuthStore());

const showTransferSummary = ref(false);
const transferAmount = ref(0);
const selectedCurrency = ref(supportedCurrencies.value[0]);

const sendMoney = () => {
  showTransferSummary.value = true;
};

const recentTransactions = ref([
  {
    username: "Jerry",
    type: "SEND",
    amount: {
      currency: Currency.TRY,
      amount: -49239,
    },
    timeStamp: new Date(),
  },
  {
    username: "Lisa",
    type: "RECEIVED",
    amount: {
      currency: Currency.NGN,
      amount: 49239,
    },
    timeStamp: new Date(),
  },
]);
</script>

<style scoped></style>
