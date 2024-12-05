<template>
  <UCard :ui="{ base: 'h-full' }" v-if="vendorCarts.length !== 0">
    <UAlert
      icon="i-icon-alert"
      color="green"
      variant="solid"
      description="You can only checkout from one store at a time"
    >
      <template #icon="{ icon }">
        <UIcon :name="icon" color="white" />
      </template>
    </UAlert>
    <div class="mt-6 grid gap-2">
      <div class="grid gap-2" v-for="(cart, index) in vendorCarts">
        <div class="flex items-center justify-between">
          <h2 class="flex items-center gap-2 font-semibold">
            {{ cart.vendor.publicName }} <UIcon name="i-icon-verified-badge" />
          </h2>
          <UIcon name="i-icon-trash" @click="vendorCarts.splice(index, 1)" />
        </div>
        <UAvatarGroup size="xl" square :max="4">
          <UAvatar
            :src="product.product.banner.link"
            v-for="product in cart.products"
            class="border-2 border-white"
            :ui="{ rounded: 'rounded-md' }"
          />
        </UAvatarGroup>

        <div class="">
          <span class="mr-2 font-semibold">
            {{ cart.products.length }} Items |</span
          >
          <span
            class="text-gray mr-1 text-xs font-normal"
            v-for="(product, index) in cart.products.slice(0, 3)"
          >
            <span class="" v-if="index !== 0"> • </span>
            {{ product.product.title }}
          </span>
          <span
            class="text-gray mr-1 text-xs font-normal"
            v-if="cart.products.length > 3"
          >
            + {{ cart.products.length - 3 }} item<span
              v-if="cart.products.length > 4"
              >s</span
            >
          </span>
        </div>
        <div class="flex items-center justify-start gap-x-4">
          <UButton
            label="Checkout"
            color="green"
            variant="soft"
            @click="openCheckoutModal(cart)"
          />
          <UButton
            label="Preview Cart"
            color="green"
            @click="openFullCartModal(cart)"
          />
        </div>
        <UDivider class="mt-4" />
      </div>
    </div>
  </UCard>

  <UCard
    :ui="{ base: 'h-full flex flex-col items-center justify-center' }"
    v-else
  >
    <img src="/icon/empty-cart.svg" alt="" />
    <h2 class="flex flex-col items-center justify-center gap-4">
      <span class="block font-semibold"> Your cart is empty </span>
      <span class="text-gray text-sm"> Check out what's trending </span>
    </h2>
  </UCard>
</template>

<script setup lang="ts">
import { useVendorStore } from "~/store/vendor.store";
import type { VendorCartEntity } from "~/types/product";

const { vendorCarts } = storeToRefs(useVendorStore());
const vendorStore = useVendorStore();

const emits = defineEmits(["openCheckoutModal", "openFullCartsModal"]);
const openCheckoutModal = (cart: VendorCartEntity) => {
  vendorStore.selectVendorCart(cart);
  emits("openCheckoutModal");
};
const openFullCartModal = (cart: VendorCartEntity) => {
  vendorStore.selectVendorCart(cart);
  emits("openFullCartsModal");
};
</script>

<style scoped></style>
