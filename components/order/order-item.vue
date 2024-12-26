<template>
  <div class="flex flex-wrap gap-4">
    <UCard class="bg-primary-400 text-white" v-for="order in orders">
      <h3>{{ order.id }}</h3>
      <p>{{ order.activeStatus }}</p>
      <p>Quantity: {{ order.time }}</p>
      <p>Type: {{ order.data.type }}</p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from "~/store/order.store";

const { orders } = storeToRefs(useOrderStore());
</script>

<style scoped></style>
