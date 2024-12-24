<template>
  <UCard
    v-if="vendorCarts.length !== 0"
    class="hide-scrollbar h-full overflow-y-scroll"
    :ui="{ divide: 'divide-white h-full ', body: { padding: 'px-0 sm:p-0' } }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="invisible">cart</h3>
        <UIcon
          size="3xl"
          class="h-6 w-6 cursor-pointer"
          name="i-icon-cancel"
          @click="emit('close')"
        />
      </div>
    </template>
    <UAlert
      icon="i-icon-alert"
      color="green"
      variant="solid"
      :ui="{ rounded: 'rounded-b-none rounded-t-lg' }"
      description="You can only checkout from one store at a time"
    >
      <template #icon="{ icon }">
        <UIcon :name="icon" color="white" />
      </template>
    </UAlert>
    <div class="mt-6 grid gap-2 p-4">
      <div class="grid gap-2" v-for="(cart, index) in vendorCarts">
        <div class="flex items-center justify-between">
          <h2 class="flex items-center gap-2 font-semibold">
            {{ cart.vendor.publicName }} <UIcon name="i-icon-verified-badge" />
          </h2>
          <UIcon
            name="i-icon-trash"
            class="h-5 w-5"
            @click="deleteVendorCart(cart.vendorId)"
          />
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
    v-else
    class="hide-scrollbar h-full w-full overflow-y-scroll"
    :ui="{
      ring: 'ring-0 ring-gray-200 dark:ring-gray-800',
      divide: 'divide-white h-full',
    }"
  >
    <template #header>
      <div class="flex w-full items-center justify-between">
        <h3 class="invisible">.</h3>
        <UIcon
          size="3xl"
          class="h-6 w-6 cursor-pointer"
          name="i-icon-cancel"
          @click="emit('close')"
        />
      </div>
    </template>
    <UCard
      :ui="{
        ring: 'ring-0 ',
        shadow: 'shadow-none',
        base: 'h-full flex flex-col border-none items-center justify-center',
      }"
    >
      <img src="/icon/empty-cart.svg" alt="" />
      <h2 class="flex flex-col items-center justify-center gap-4">
        <span class="block font-semibold"> Your cart is empty </span>
        <span class="text-gray text-sm"> Check out what's trending </span>
      </h2>
    </UCard>
  </UCard>
</template>

<script setup lang="ts">
import { useProductStore } from "~/store/product.store";
import type { VendorCartEntity } from "~/types/product";

const toast = useToast();
const { vendorCarts } = storeToRefs(useProductStore());
const productStore = useProductStore();

const emit = defineEmits(["openCheckoutModal", "openFullCartsModal", "close"]);
const openCheckoutModal = (cart: VendorCartEntity) => {
  productStore.selectVendorCart(cart);
  emit("openCheckoutModal");
};
const openFullCartModal = (cart: VendorCartEntity) => {
  productStore.selectVendorCart(cart);
  emit("openFullCartsModal");
};

const deleteVendorCart = (vendorId: string) => {
  productStore.deleteVendorCart(vendorId);
};
</script>

<style scoped></style>
