<template>
  <UCard
    class="hide-scrollbar mx-auto w-[646px] overflow-scroll"
    v-if="!showTransferDetails"
  >
    <div class="mx-auto mt-2 w-full">
      <UInput
        icon="i-icon-search-icon"
        size="xl"
        class="flex-1"
        color="white"
        :trailing="false"
        :ui="{ rounded: 'rounded-xl' }"
        v-model="searchedTerm"
        placeholder="Search"
      />
    </div>

    <div class="my-6">
      <div class="mb-2 flex items-center justify-between font-medium">
        <h2 class="">Quick Send</h2>
        <h2 class="text-blue-500">View all</h2>
      </div>

      <div class="flex items-center">
        <UButton variant="outline" icon="i-icon-plus" class="rounded-full" />
        <UAvatarGroup
          :max="4"
          class="ml-1 flex items-center gap-x-1.5"
          size="lg"
        >
          <UButton
            variant="ghost"
            v-for="user in quickSendList"
            class="flex-center flex flex-col"
            @click="setReceipeintDetails(user)"
          >
            <UAvatar class="h-8 w-8 rounded-full" :src="user.picture" alt="" />
            <h2 class="text-xs font-semibold">{{ user.username }}</h2>
          </UButton>
        </UAvatarGroup>
      </div>
    </div>

    <div class="">
      <div class="mb-2 flex items-center justify-between font-medium">
        <h2 class="">Recently sent</h2>
        <h2 class="text-blue-500">View all</h2>
      </div>

      <div class="grid gap-4">
        <div class="flex gap-x-4" v-for="transaction in recentSendList">
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
  </UCard>

  <WalletTransferDetails v-else :receipient="receipientDetails" />
</template>

<script setup lang="ts">
import { Currency } from "~/types/enums";

const searchedTerm = ref("");
const showTransferDetails = ref(false);

interface Receipient {
  name: string;
  username: string;
  picture: string;
}

const quickSendList = ref<Receipient[]>([
  {
    name: "Alice Johnson",
    username: "alicej",
    picture: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Bob Smith",
    username: "bobsmith",
    picture: "https://randomuser.me/api/portraits/men/60.jpg",
  },
  {
    name: "Charlie Brown",
    username: "charlieb",
    picture: "https://randomuser.me/api/portraits/women/30.jpg",
  },
  {
    name: "Diana Prince",
    username: "dianap",
    picture: "https://randomuser.me/api/portraits/men/37.jpg",
  },
  {
    name: "Ethan Hunt",
    username: "ethanh",
    picture: "https://randomuser.me/api/portraits/women/47.jpg",
  },
]);

const receipientDetails = ref(quickSendList.value[0]);

const setReceipeintDetails = (receipient: Receipient) => {
  showTransferDetails.value = true;
  receipientDetails.value = receipient;
};

const recentSendList = ref([
  {
    username: "Jerry",
    amount: {
      currency: Currency.TRY,
      amount: -49239,
    },
    timeStamp: new Date("2023-01-15T10:30:00Z"),
  },
  {
    username: "Lisa",
    amount: {
      currency: Currency.NGN,
      amount: -49239,
    },
    timeStamp: new Date("2023-02-20T14:45:00Z"),
  },
  {
    username: "Jerry",
    amount: {
      currency: Currency.TRY,
      amount: 49239,
    },
    timeStamp: new Date("2023-03-25T08:15:00Z"),
  },
  {
    username: "Jerry",
    amount: {
      currency: Currency.TRY,
      amount: 49239,
    },
    timeStamp: new Date("2023-04-30T12:00:00Z"),
  },
  {
    username: "Jerry",
    amount: {
      currency: Currency.TRY,
      amount: 49239,
    },
    timeStamp: new Date("2023-05-05T16:30:00Z"),
  },
  {
    username: "Jerry",
    amount: {
      currency: Currency.TRY,
      amount: 49239,
    },
    timeStamp: new Date("2023-06-10T09:00:00Z"),
  },
  {
    username: "Jerry",
    amount: {
      currency: Currency.TRY,
      amount: 49239,
    },
    timeStamp: new Date("2023-07-15T18:45:00Z"),
  },
]);
</script>

<style scoped></style>
