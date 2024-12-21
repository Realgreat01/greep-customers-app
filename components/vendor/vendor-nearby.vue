<template>
  <div class="flex w-64 gap-x-8 rounded-xl border bg-white px-5 py-4">
    <UAvatar
      :src="vendor.bio?.photo?.link"
      size="2xl"
      :alt="vendor.publicName"
    />
    <div class="grid gap-1">
      <h2
        class="text-xs"
        :class="
          isStoreOpen(vendor.vendor.schedule)
            ? 'text-green-500'
            : 'text-gray-500'
        "
        v-html="gpDates.getVendorSchedule(vendor.vendor.schedule, 'day')"
      ></h2>
      <VendorName :name="vendor.publicName" class="text-sm font-semibold" />
      <VendorStatus :schedule="vendor.vendor.schedule" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVendorStore } from "~/store/vendor.store";
import type { UserEntity } from "~/types/user";

const props = defineProps({
  vendor: {
    type: Object as PropType<UserEntity>,
    required: true,
  },
});

const { isStoreOpen } = useVendorStore();
</script>

<style scoped></style>
