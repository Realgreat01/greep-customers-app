<template>
  <UCard class="grid w-[320px] gap-4">
    <img
      :src="vendor.bio?.photo?.link ?? '/blank.png'"
      alt=""
      class="block h-32 w-full object-cover object-center"
    />
    <h2 class="text-primary my-2 font-bold">
      {{ vendor.publicName !== "" ? vendor.publicName : "Greep Store" }}
    </h2>
    <p class="my-2 text-sm text-gray-400">
      {{ gpHelpers.sliceWords(generateVendorDescription(vendor.type), 150) }}
      <!-- {{ words }} -->
    </p>

    <div class="flex items-center justify-between">
      <VendorStatus :schedule="vendor.vendor.schedule" />
      <UButton
        label="View Store"
        icon="i-icon-shop-view"
        @click="selectVendor"
      />
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
    name: GP_ROUTES.DASHBOARD.VENDOR_STORE,
    params: { id: props.vendor.id },
  });
};

function generateVendorDescription(vendor: UserEntity["type"]) {
  return `Welcome to ${vendor.name}, we deal in ${vendor.vendorType}. Our location is ${vendor.location.location}, ${vendor.location.description}.`;
}
</script>

<style scoped></style>
