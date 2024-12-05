<template>
  <div class="flex flex-col px-4 py-10 lg:px-24">
    <UButton
      icon="i-icon-arrow-left"
      label="Back"
      variant="ghost"
      class="flex w-fit items-center"
      @click="router.push({ name: GP_ROUTES.DASHBOARD.HOME })"
    />

    <div
      v-if="selectedVendor"
      class="mx-auto flex flex-col items-center justify-center gap-4 lg:w-2/3"
    >
      <UAvatar
        :alt="selectedVendor.publicName"
        size="3xl"
        :src="selectedVendor?.bio?.photo?.link"
      />

      <h2 class="text-lg font-semibold">
        {{
          selectedVendor.publicName !== ""
            ? selectedVendor.publicName
            : "Greep Store"
        }}
      </h2>

      <VendorStatus :schedule="selectedVendor?.vendor.schedule ?? null" />

      <p class="py-6 text-center text-gray-400">
        {{ generateVendorDescription(selectedVendor.type) }}
        <!-- {{ words }} -->
      </p>
    </div>

    <div class="py-5 lg:py-10">
      <div
        v-if="vendorLoadingStates.loadingProducts"
        class="mx-auto flex flex-wrap justify-center gap-5 py-10 lg:justify-start"
      >
        <UCard
          v-for="i in 12"
          class="w-80 p-0"
          :ui="{
            base: 'overflow-hidden grid gap-2',
            body: {
              padding: 'px-0 py-0 sm:p-0',
            },
          }"
        >
          <USkeleton class="h-40 w-full" />
          <div class="grid gap-2 p-2">
            <USkeleton class="h-6 w-32 font-bold" />
            <USkeleton class="h-16 text-sm" />

            <UDivider class="" />

            <USkeleton class="h-6 w-28 font-bold" />

            <div class="flex items-center justify-between">
              <div class="flex items-center justify-center gap-8">
                <USkeleton v-for="i in 2" class="flex h-6 w-6" />
              </div>
              <USkeleton class="h-6 w-32" />
            </div>
          </div>
        </UCard>
      </div>
      <BaseEmptyList v-else-if="vendorProducts.length === 0" />
      <div
        v-else
        class="mx-auto flex flex-wrap justify-center gap-5 py-10 lg:justify-start"
      >
        <ProductCard v-for="product in vendorProducts" :product />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
import { useVendorStore } from "~/store/vendor.store";
import type { UserEntity } from "~/types/user";

const {
  vendorProducts,
  cart,
  vendorCarts,
  selectedVendor,
  vendorLoadingStates,
} = storeToRefs(useVendorStore());
const vendorStore = useVendorStore();
const route = useRoute();
const router = useRouter();
function generateVendorDescription(vendor: UserEntity["type"]) {
  return `Welcome to ${vendor.name}, we deal in ${vendor.vendorType}. Our location is ${vendor.location.location}, ${vendor.location.description}.`;
}

onBeforeMount(() => {
  vendorStore.getVendorProducts(route.params.id as string);
  vendorStore.getSelectedVendor(route.params.id as string);
});
</script>

<style scoped></style>
