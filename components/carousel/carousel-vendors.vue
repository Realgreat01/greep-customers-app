<template>
  <div class="">
    <h2 class="mb-5 text-2xl font-semibold">{{ title }}</h2>

    <div
      v-if="productLoadingStates.loadingProducts === true"
      class="flex flex-wrap justify-center gap-2 lg:justify-start"
    >
      <UCard class="grid w-[280px] gap-4" v-for="i in 3">
        <USkeleton class="h-32 w-full" />
        <USkeleton class="my-2 h-4 w-[80%]" />
        <div class="flex items-center justify-between">
          <USkeleton class="h-4 w-20" v-for="i in 2" />
        </div>
      </UCard>
    </div>
    <BaseEmptyList
      v-else-if="filteredVendors.length === 0"
      message="No vendor found"
      hideButton
    />

    <div v-else class="flex h-fit !max-w-[980px] items-center gap-x-2">
      <UCarousel
        v-slot="{ item, index }"
        ref="vendorsCarousel"
        :items="vendors"
        class="mx-auto w-[95%] rounded-lg"
        :ui="{
          item: 'mx-2.5',
          container: 'rounded-lg',
        }"
      >
        <VendorCard :vendor="item" />
      </UCarousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInteractionStore } from "~/store/interactions.store";
import { useProductStore } from "~/store/product.store";
import { useVendorStore } from "~/store/vendor.store";
import type { UserEntity } from "~/types/user";

const props = defineProps({
  vendors: {
    type: Array as PropType<UserEntity[]>,
    required: true,
  },
  title: { type: String, default: "All Stores" },
  autoplay: Boolean,
  delay: {
    type: Number,
    default: 0,
  },
});

const searchedTerm = ref("");
const { vendors } = storeToRefs(useVendorStore());
const { productLoadingStates } = storeToRefs(useProductStore());

const filteredVendors = computed(() =>
  props.vendors.filter((vendor) =>
    vendor.publicName.toLowerCase().includes(searchedTerm.value.toLowerCase()),
  ),
);

const vendorsCarousel = ref();

onMounted(() => {
  setInterval(() => {
    if (!vendorsCarousel.value) return;

    if (vendorsCarousel.value.page === vendorsCarousel.value.pages) {
      return vendorsCarousel.value.select(0);
    }

    if (props.autoplay) vendorsCarousel.value.next();
  }, 2000 + props.delay);
});
</script>

<style scoped></style>
