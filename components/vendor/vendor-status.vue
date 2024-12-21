<template>
  <div
    :class="isStoreOpen(schedule) ? 'text-green-500' : 'text-gray-500'"
    class="flex items-center gap-x-1 text-xs font-medium ring-gray-200"
  >
    <UIcon name="i-icon-circle-dot" class="h-4 w-4" />
    {{ isStoreOpen(schedule) ? "Open" : "Closed" }}
  </div>
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
