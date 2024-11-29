<template>
  <UButton
    label="open"
    variant="outline"
    icon="i-icon-blank-dot"
    :class="
      isStoreOpen(schedule)
        ? 'fill-green-500 text-green-500'
        : 'fill-red-500 text-red-500'
    "
    class="flex items-center font-semibold ring-gray-200"
    >{{ isStoreOpen(schedule) ? "Open" : "Closed" }}</UButton
  >
</template>

<script setup lang="ts">
import { useVendorStore } from "~/store/vendor.store";
import type { Vendor } from "~/types/user";

defineProps({
  schedule: {
    type: [Object, null] as PropType<Vendor["schedule"]>,
    required: true,
  },
});

const { isStoreOpen } = useVendorStore();
</script>

<style scoped></style>
