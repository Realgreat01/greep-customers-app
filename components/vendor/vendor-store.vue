<template>
  <div class="flex flex-col px-4">
    <UButton
      icon="i-icon-arrow-left"
      label="Back"
      variant="outline"
      color="gray"
      :ui="{ rounded: 'rounded-3xl' }"
      class="flex w-fit items-center text-black ring-gray-500"
      @click="router.push({ name: GP_ROUTES.DASHBOARD.HOME })"
    />

    <div v-if="selectedVendor" class="mx-auto my-5 flex w-full flex-col gap-4">
      <img
        :alt="selectedVendor.publicName"
        class="h-[237px] w-full rounded-xl object-cover object-[40%]"
        :src="selectedVendor?.bio?.photo?.link ?? '/blank.png'"
      />

      <div class="flex items-center justify-between">
        <VendorName
          class="text-xl font-semibold"
          :name="
            selectedVendor.publicName !== ''
              ? selectedVendor.publicName
              : 'Greep Store'
          "
        />
      </div>

      <div class="flex items-center justify-between">
        <div class="flex gap-x-10">
          <h2 class="text-xs text-[#7E8392]">
            Opening Hours
            <span class="block text-sm text-black">{{
              gpDates.getVendorSchedule(selectedVendor.vendor.schedule)
            }}</span>
          </h2>

          <h2
            class="text-xs text-[#7E8392]"
            v-if="selectedVendor.vendor.averagePrepTimeInMins"
          >
            Delivery Time
            <span class="block text-sm text-black">
              {{
                gpDates.getTimeDifference(
                  selectedVendor.vendor.averagePrepTimeInMins.from,
                  selectedVendor.vendor.averagePrepTimeInMins.to,
                )
              }}
            </span>
          </h2>
        </div>
        <div class="flex gap-x-2">
          <UIcon
            name="i-icon-chat"
            size="xl"
            :ui="{ rounded: 'rounded-full' }"
          />
          <UInput
            icon="i-icon-search-icon"
            size="sm"
            color="white"
            :trailing="false"
            :ui="{ rounded: 'rounded-3xl' }"
            placeholder="Search Store"
          />
        </div>
      </div>

      <!-- <VendorStatus :schedule="selectedVendor?.vendor.schedule ?? null" /> -->
    </div>

    <div class="py-2">
      <h2 class="text-xl font-semibold">Reviews and Rating</h2>
      <div class="flex w-full items-center gap-x-3">
        <UCard class="h-[236px] w-96">
          <div class="flex min-h-[180px] w-full flex-col justify-between gap-2">
            <UMeter
              color="green"
              size="lg"
              block
              :value="i * 10 + 40"
              v-for="i in 5"
            />
          </div>
        </UCard>

        <div
          class="hide-scrollbar flex flex-1 items-center gap-x-2 overflow-scroll p-1"
        >
          <UCard class="h-[240px] min-w-96" v-for="item in reviews">
            <h2 class="font-semibold">
              {{ item.user }}
              <span class="ml-2 text-xs font-normal text-gray-400">
                {{ gpDates.getTimeAgo(item.time) }}</span
              >
            </h2>
            <UIcon name="i-icon-star" v-for="i in item.rating" />
            <p class="text-sm text-gray-500">{{ item.review }}</p>
          </UCard>
        </div>
      </div>
    </div>
    <div class="py-5 lg:py-10">
      <div
        v-if="productLoadingStates.loadingProducts"
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
        class="mx-auto flex flex-wrap justify-center gap-1 gap-y-5 py-10 lg:justify-start"
      >
        <ProductCard v-for="product in vendorProducts" :product />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
import { useProductStore } from "~/store/product.store";
import { useVendorStore } from "~/store/vendor.store";
import type { UserEntity } from "~/types/user";

const { selectedVendor } = storeToRefs(useVendorStore());
const { vendorProducts, productLoadingStates } = storeToRefs(useProductStore());

const productStore = useProductStore();
const vendorStore = useVendorStore();

const route = useRoute();
const router = useRouter();

const reviews = ref([
  {
    user: "David Jong",
    rating: 4,
    time: "2024-12-18T14:34:56.789Z",
    review:
      "The service was quite satisfactory overall. The staff were friendly, and the process was smooth. However, there were minor delays that could be improved upon. I would recommend this service to friends, but it would benefit from addressing a few efficiency concerns to enhance the overall experience.",
  },
  {
    user: "Emma Blake",
    rating: 5,
    time: "2024-12-16T11:23:45.123Z",
    review:
      "Absolutely amazing experience from start to finish! The attention to detail and customer care exceeded all expectations. I couldn’t have asked for a better service, and I will definitely be returning. Kudos to the team for such a professional and seamless experience. Highly recommend!",
  },
  {
    user: "Michael Perez",
    rating: 3,
    time: "2024-12-13T08:15:30.456Z",
    review:
      "It was okay, but there’s room for improvement. While the service was decent, I felt there were some noticeable gaps in communication and timing. The staff seemed a bit rushed, which impacted the overall experience. With a few tweaks, this could be a top-tier service.",
  },
  {
    user: "Sophia White",
    rating: 2,
    time: "2024-12-08T17:42:10.789Z",
    review:
      "Not very impressed with the overall experience. The service was below expectations, and there were several miscommunications along the way. The staff tried their best, but I feel like there’s a significant need for better management and customer focus. I hope future experiences improve.",
  },
  {
    user: "Liam Carter",
    rating: 5,
    time: "2024-12-17T09:05:25.678Z",
    review:
      "Excellent service! From the moment I arrived, everything was handled with utmost professionalism. The staff were knowledgeable, courteous, and went above and beyond to ensure my satisfaction. I would highly recommend this service to anyone looking for a seamless and pleasant experience.",
  },
]);

onBeforeMount(async () => {
  await productStore.getVendorProducts(route.params.id as string);
  await vendorStore.getSelectedVendor(route.params.id as string);
});
</script>

<style scoped></style>
