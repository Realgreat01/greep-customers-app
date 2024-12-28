<template>
  <div class="grid gap-5 p-5">
    <h1 class="font-semibold">Wallet</h1>

    <UCard
      class="max-w-[600px]"
      :ui="{
        body: {
          padding: 'px-10 px-10 sm:p-10',
        },
      }"
    >
      <div class="flex items-start justify-between">
        <h2 class="text-gray-400">Total balance</h2>
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
      </div>

      <h2 class="text-5xl font-semibold" v-if="wallet">
        {{
          gpNumbers.formatCurrency(
            wallet.balance?.amount,
            wallet.balance?.currency,
          )
        }}
      </h2>
    </UCard>

    <div class="my-5 flex items-center gap-5">
      <UButton
        @click="btn.action"
        v-for="btn in actionButtons"
        :trailing-icon="btn.icon"
        trailing
        :label="btn.label"
        variant="outline"
        :ui="{ rounded: 'rounded-full' }"
      />
    </div>

    <div class="grid gap-5 rounded-xl border border-gray-200">
      <div class="flex items-center justify-between px-5 py-5 font-semibold">
        <h2 class="text-xl">Recent Transactions</h2>
        <h2 class="text-green-500 underline">See All</h2>
      </div>

      <UTable :rows="transactionsHistory" :columns="columns">
        <template #id-data="{ row }"> #{{ row.id.slice(0, 7) }} </template>
        <template #createdAt-data="{ row }">
          {{ gpDates.getChatsTime(new Date(row.createdAt)) }}
        </template>
        <template #email-data="{ row }">
          <div class="flex items-center gap-x-2">
            <div
              class="flex-center flex h-8 w-8 rounded-full"
              square
              :style="generateBgColor(getTransactionIcon(row.data).bgColor)"
              :ui="{
                rounded: 'rounded-full',
              }"
            >
              <UIcon
                :name="getTransactionIcon(row.data).icon"
                :style="generateBgColor(getTransactionIcon(row.data).iconColor)"
              />
            </div>
            <span class="block"> {{ row.email }}</span>
          </div>
        </template>
        <template #data-data="{ row }">
          {{ row.data.type }}
        </template>
        <template #status-data="{ row }">
          <UButton
            variant="ghost"
            class="w-28 text-gray-500 ring-1 ring-gray-200"
          >
            <UIcon
              name="i-icon-circle-dot"
              :class="{
                'text-red-500': row.status === 'failed',
                'text-green-500': row.status === 'fulfilled',
                'text-blue-500': row.status === 'initialized',
                'text-brand-500': row.status === 'settled',
              }"
            />
            <span class="!font-normal capitalize">{{ row.status }}</span>
          </UButton>
        </template>

        <template #amount-data="{ row }">
          {{ gpNumbers.formatCurrency(row.amount) }}
        </template>
      </UTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
import { usePaymentStore } from "~/store/payment.store";
import { Currency } from "~/types/enums";
import type { TransactionEntity } from "~/types/payment";

definePageMeta({
  name: GP_ROUTES.WALLETS.OVERVIEW,
});
const { wallet, transactionsHistory, supportedCurrencies } =
  storeToRefs(usePaymentStore());
const router = useRouter();

const selectedCurrency = ref(supportedCurrencies.value[0]);
const currencies = [Currency.TRY, Currency.NGN];

const actionButtons = ref([
  {
    label: "Deposit",
    icon: "i-icon-plus",
    action: () => {
      router.push({ name: GP_ROUTES.WALLETS.DEPOSIT });
    },
  },
  {
    label: "Transfer",
    icon: "i-icon-arrow-right-2",
    action: () => {
      router.push({ name: GP_ROUTES.WALLETS.TRANSFER });
    },
  },
  {
    label: "Withdraw",
    icon: "i-icon-minus",
    action: () => {
      router.push({ name: GP_ROUTES.WALLETS.WITHDRAW });
    },
  },
]);

const columns = ref([
  {
    key: "id",
    label: "Trans ID",
  },
  {
    key: "createdAt",
    label: "Date",
  },
  {
    key: "email",
    label: "Customer",
  },
  {
    key: "data",
    label: "Payment Type",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "amount",
    label: "Amount",
  },
]);

const getTransactionIcon = (
  type: TransactionEntity["data"],
): { bgColor: string; icon: string; iconColor: string } => {
  if (type.type === "Sent")
    return {
      bgColor: "#FFDBDB",
      icon: "i-icon-arrow-up",
      iconColor: "#FF5656",
    };
  if (type.type === "Received") {
    return {
      bgColor: "#00FF0887",
      icon: "i-icon-arrow-down",
      iconColor: "#00B206",
    };
  }
  if (type.type === "OrderPayment") {
    return {
      bgColor: "#f5d0fe",
      icon: "i-icon-arrow-outward",
      iconColor: "#c026d3",
    };
  }
  if (type.type === "OrderPaymentRefund") {
    return {
      bgColor: "#7604c230",
      icon: "i-icon-arrow-inward",
      iconColor: "#7604c2",
    };
  }
  if (type.type === "Withdrawal") {
    return {
      bgColor: "#FFBDBD",
      icon: "i-icon-arrow-outward",
      iconColor: "#B20000",
    };
  }
  if (type.type === "WithdrawalRefund") {
    return {
      bgColor: "#bfdbfe",
      icon: "i-icon-arrow-inward",
      iconColor: "#275dfa ",
    };
  }

  return {
    bgColor: "#B8FFE2",
    icon: "i-icon-arrow-down",
    iconColor: "#009258",
  };
};

const generateBgColor = (color: string) => ({
  backgroundColor: color,
});
</script>

<style scoped>
/* Add your styles here */
</style>
