<template>
  <UCard
    @click="selectProduct"
    :class="{
      'w-[300px]': product.data.type === 'foods',
      'w-[200px]': product.data.type === 'items',
    }"
    :ui="{
      base: 'overflow-hidden grid gap-2',
      body: {
        padding:
          product.data.type === 'foods'
            ? 'px-4 py-3 sm:p-3'
            : 'px-0 py-0  sm:p-2',
      },
    }"
  >
    <div class="relative">
      <img
        :src="product?.banner.link ?? '/blank.png'"
        alt=""
        :class="{
          'rounded-lg': product.data.type === 'items',
        }"
        class="mb-2 block h-40 w-full rounded-t-lg object-cover object-[50%]"
      />
      <UButton
        icon="i-icon-plus"
        v-if="product.data.type === 'items'"
        class="flex-center absolute bottom-2 right-2 flex h-8 w-8 rounded-full bg-white text-center text-gray-500"
      />
    </div>
    <div
      class="grid gap-2"
      :class="{
        'p-2': product.data.type === 'items',
      }"
    >
      <h2 class="font-semibold">{{ product?.title }}</h2>
      <!-- <UDivider class="" /> -->

      <div class="flex justify-between text-xs text-gray-400">
        <h2 class="">
          <span class="" v-if="product.data.type === 'foods'"
            >Starts from
          </span>
          <span class="font-semibold text-gray-500">
            {{
              gpNumbers.formatCurrency(
                product?.price.amount,
                product?.price.currency,
              )
            }}</span
          >
        </h2>

        <h2
          class="flex items-center gap-x-2"
          v-if="product.data.type === 'foods'"
        >
          <UIcon name="i-icon-time" class="h-4 w-4" />
          {{ product.data.prepTimeInMins.from }} —
          {{ product.data.prepTimeInMins.to }} mins
        </h2>
      </div>
    </div>
    <USlideover v-model="openProductPreview" class="z-[2000]">
      <SliderProductPreview />
    </USlideover>
  </UCard>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { GP_ROUTES } from "~/constants/routes";
import { useAuthStore } from "~/store/auth.store";
import { useProductStore } from "~/store/product.store";
import type { ProductEntity } from "~/types/product";

const props = defineProps({
  product: {
    type: Object as PropType<ProductEntity>,
    required: true,
  },
});

const toast = useToast();
const productStore = useProductStore();
const { cart } = storeToRefs(useProductStore());
const { isLoggedIn } = storeToRefs(useAuthStore());

const openProductPreview = ref(false);
const quantity = ref(1);

const selectProduct = () => {
  productStore.selectProduct(props.product);
  openProductPreview.value = true;
};

const addToCart = () => {
  if (isLoggedIn.value === true) {
    toast.add({ title: "Item added to cart succesfully!", color: "green" });
    productStore.addToCart(props.product, quantity.value);
  } else
    navigateTo(
      { name: GP_ROUTES.LOGIN, replace: true },
      { replace: true, redirectCode: 401 },
    );
};
</script>

<style scoped></style>
