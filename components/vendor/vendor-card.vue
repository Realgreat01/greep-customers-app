<template>
  <UCard
    @click="selectVendor"
    class="w-80 p-0"
    :ui="{
      base: 'overflow-hidden border-none ring-0 grid gap-2',
      ring: 'ring-0',
      shadow: 'shadow-none',
      body: {
        padding: 'px-0 py-0 sm:p-0',
      },
    }"
  >
    <img
      :src="vendor.bio?.photo?.link ?? '/blank.png'"
      alt=""
      class="block h-40 w-full rounded-xl object-cover object-center"
    />
    <div class="grid gap-2 p-2.5">
      <VendorName
        class="text-primary font-semibold"
        isVerified
        :name="vendor.publicName !== '' ? vendor.publicName : 'Greep Store'"
      />
      <UDivider class="" />

      <div class="flex justify-between text-xs text-gray-400">
        <h2 class="">Starts from</h2>

        <h2
          class="flex items-center gap-x-2"
          v-if="vendor.vendor.averagePrepTimeInMins !== null"
        >
          <UIcon name="i-icon-time" class="h-4 w-4" />

          {{ vendor.vendor.averagePrepTimeInMins.from }}
          —— {{ vendor.vendor.averagePrepTimeInMins.from }} mins
        </h2>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
import { useVendorStore } from "~/store/vendor.store";
import type { UserEntity } from "~/types/user";

const props = defineProps({
  vendor: {
    type: Object as PropType<UserEntity>,
    required: true,
  },
});

const router = useRouter();

const { SelectedVendor } = storeToRefs(useVendorStore());

const selectVendor = () => {
  SelectedVendor.value = props.vendor;
  router.push({
    name:
      props.vendor.type.vendorType === "foods"
        ? GP_ROUTES.RESTURANT.STORE
        : GP_ROUTES.MARKET.STORE,
    params: { id: props.vendor.id },
  });
};
</script>

<style scoped></style>
