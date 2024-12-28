<template>
  <div class="p-5">
    <h1 class="text-xl font-semibold">Orders</h1>
    <UTabs :items="items" :default-index="1">
      <template #active="{ item }">
        This is for all active orders users has placed user can click on each
        other to send support message

        <OrderItem />
      </template>
      <template #pending="{ item }">
        Orders customer has not paid for created during checkout that they
        haven't paid for, They can then click here to complete the payment for
        such orders

        <div class="grid gap-6">
          <div class="" v-for="cart in cartlinks">
            Created :
            {{ gpDates.formatDate(new Date(cart.createdAt)) }}
            <div
              class=""
              v-for="[productId, product] in Object.entries(cart.products)"
            >
              {{ product.title }}

              <img
                :src="product.banner.link"
                alt=""
                class="h-8 w-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </template>
    </UTabs>

    <!-- {{ cartlinks[0] }} -->
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
import { useProductStore } from "~/store/product.store";

definePageMeta({
  name: GP_ROUTES.ORDERS.OVERVIEW,
});

const items = [
  {
    label: "Pending Orders",
    icon: "i-heroicons-arrow-down-tray",
    slot: "pending",
    content: "And, this is the content for Tab2",
  },
  {
    label: "Active Orders",
    icon: "i-heroicons-information-circle",
    slot: "active",
    default: true,
    content: "This is for all active orders users has placed",
  },
  {
    label: "Completed",
    icon: "i-heroicons-eye-dropper",
    slot: "completed",
    content:
      "Completed orders can come here for users to see and drop product review or review the vendor",
  },
];

const { cartlinks } = storeToRefs(useProductStore());
const productsStore = useProductStore();
const cart = [
  {
    id: "6713b06e4c9c05108492012d",
    packs: [
      [
        {
          id: "66687692007a37abca6afafd",
          quantity: 1,
          addOns: [],
          price: { amount: 5000, currency: "TRY" },
        },
      ],
    ],
    userId: "660a7df4eb3b8f4cee9e89dc",
    vendorId: "660a7df4eb3b8f4cee9e89dc",
    vendorType: "foods",
    active: true,
    createdAt: 1729343598866,
    updatedAt: 1729343598866,
    __hash: "3d418414b6cb47eba90f",
    __type: "CartLinkEntity",
    products: {
      "66687692007a37abca6afafd": {
        id: "66687692007a37abca6afafd",
        title: "Bean",
        price: { amount: 5000, currency: "TRY" },
        banner: {
          name: "images (1).jpeg",
          type: "image/jpeg",
          size: 13191,
          duration: 0,
          path: "storage/development/marketplace/products/banners/1728506049014-images%20(1).jpeg",
          timestamp: 1728506049014,
          link: "https://development.apis.greep.io/api/storage/development/marketplace/products/banners/1728506049014-images%20(1).jpeg",
        },
        user: {
          id: "660a7df4eb3b8f4cee9e89dc",
          bio: {
            name: { first: "Godwin", last: "Jerry", full: "Godwin Jerry" },
            photo: {
              name: "images (18).jpeg",
              type: "image/jpeg",
              size: 96975,
              duration: 0,
              path: "storage/development/profiles/1734811400262-images%20(18).jpeg",
              timestamp: 1734811400262,
              link: "https://development.apis.greep.io/api/storage/development/profiles/1734811400262-images%20(18).jpeg",
            },
            username: "jerrygg",
          },
          roles: { isAdmin: true, isVendor: true, isVendorFoods: true },
          publicName: "Jerry Store",
        },
        addOns: {
          toppings: {
            minSelection: 1,
            maxSelection: 1,
            items: {
              Fish: { price: { amount: 200, currency: "TRY" }, inStock: true },
              Salad: { price: { amount: 500, currency: "TRY" }, inStock: true },
              bean: { price: { amount: 20, currency: "TRY" }, inStock: true },
            },
          },
          drink: {
            minSelection: 0,
            maxSelection: 1,
            items: {
              coke: { price: { amount: 50, currency: "TRY" }, inStock: true },
            },
          },
        },
      },
    },
  },
];
onMounted(async () => {
  await productsStore.getUserCartLinks();
});
</script>

<style scoped></style>
