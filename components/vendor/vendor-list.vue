<template>
  <div class="grid gap-5">
    <div
      class="mx-auto flex w-[96%] items-center rounded-full border-2 bg-white"
    >
      <UInput
        icon="i-icon-search-icon"
        size="sm"
        class="flex-1"
        color="white"
        :trailing="false"
        variant="none"
        v-model="searchedTerm"
        placeholder="Search..."
      />

      <UButton class="!h-12 rounded-r-full" :ui="{ rounded: 'rounded-none' }">
        <UIcon name="i-icon-jelly-search" class="h-6 w-6" />
        <span class="hidden lg:block">Search</span>
      </UButton>
    </div>

    <ProductTags />

    <ProductPromos />

    <div class="bg-[#0092600D] p-5">
      <h2 class="mb-5 text-2xl font-semibold">
        Breakfast for the day &nbsp; &nbsp;
        <UIcon name="i-icon-arrow-right" class="h-5 w-5" />
      </h2>

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

      <div
        v-else
        class="flex h-fit !max-w-[calc(100vw-300px)] items-center gap-x-2"
      >
        <UCarousel
          ref="foodProductsCarousel"
          v-slot="{ item }"
          :items="foodProducts"
          class="mx-auto w-[100%] rounded-lg"
          :ui="{
            item: 'mx-2.5',
            container: 'rounded-lg',
          }"
        >
          <ProductCard :product="item" />
        </UCarousel>
      </div>
    </div>

    <div class="bg-[#ccf9280d] p-5">
      <h2 class="mb-5 text-2xl font-semibold">
        Latest Products&nbsp; &nbsp;
        <UIcon name="i-icon-arrow-right" class="h-5 w-5" />
      </h2>

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

      <div
        v-else
        class="flex h-fit !max-w-[calc(100vw-300px)] items-center gap-x-2"
      >
        <UCarousel
          ref="foodProductsCarousel"
          v-slot="{ item }"
          :items="latestProducts"
          class="mx-auto w-[100%] rounded-lg"
          :ui="{
            item: 'mx-2.5',
            container: 'rounded-lg',
          }"
        >
          <ProductCard :product="item" />
        </UCarousel>
      </div>
    </div>

    <!--  -->

    <div class="bg-[#ccf9280d] p-5">
      <h2 class="mb-5 text-2xl font-semibold">
        Top Products the day &nbsp; &nbsp;
        <UIcon name="i-icon-arrow-right" class="h-5 w-5" />
      </h2>

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

      <div
        v-else
        class="flex h-fit !max-w-[calc(100vw-300px)] items-center gap-x-2"
      >
        <UCarousel
          ref="foodProductsCarousel"
          v-slot="{ item }"
          :items="mostSoldProducts"
          class="mx-auto w-[100%] rounded-lg"
          :ui="{
            item: 'mx-2.5',
            container: 'rounded-lg',
          }"
        >
          <ProductCard :product="item" />
        </UCarousel>
      </div>
    </div>

    <div class="-mt-5 bg-white p-5">
      <h2 class="mb-5 text-2xl font-semibold">All Stores</h2>

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

      <div
        v-else
        class="flex h-fit !max-w-[calc(100vw-300px)] items-center gap-x-2"
      >
        <UCarousel
          v-slot="{ item, index }"
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
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/product.store";
import { useVendorStore } from "~/store/vendor.store";
const searchedTerm = ref("");
const { vendors, vendorLoadingStates } = storeToRefs(useVendorStore());
const { foodProducts, mostSoldProducts, latestProducts, productLoadingStates } =
  storeToRefs(useProductStore());
const categories = ref([
  { type: "", label: "All Vendors" },
  { type: "foods", label: "Foods" },
  { type: "items", label: "Market" },
]);
const selectedCategory = ref("");

const filteredVendors = computed(() =>
  vendors.value
    .filter((vendor) =>
      vendor.publicName
        .toLowerCase()
        .includes(searchedTerm.value.toLowerCase()),
    )
    .filter((vendor) =>
      vendor.type.vendorType.includes(selectedCategory.value),
    ),
);

const foodProductsCarousel = ref();

onMounted(() => {
  setInterval(() => {
    if (!foodProductsCarousel.value) return;

    if (foodProductsCarousel.value.page === foodProductsCarousel.value.pages) {
      return foodProductsCarousel.value.select(0);
    }

    foodProductsCarousel.value.next();
  }, 2000);
});
</script>

<style scoped></style>
