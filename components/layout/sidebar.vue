<template>
  <div class="flex flex-col bg-white">
    <NuxtLink
      :to="{ name: GP_ROUTES.DASHBOARD.HOME }"
      class="flex-center flex h-[60px] w-full border-b border-r text-center"
    >
      <img src="/logo/greep-full.svg" alt="" />
    </NuxtLink>

    <div
      class="flex h-[calc(100vh-76px)] max-h-[800px] flex-col gap-2.5 border-r p-4"
    >
      <NuxtLink
        class="flex cursor-pointer items-center gap-x-2 rounded-r-lg p-2"
        v-for="nav in sidebarRoutes"
        :to="{ name: nav.route }"
        :class="
          route.meta.name && route.meta.name.includes(nav.route)
            ? 'bg-green-50 font-semibold text-green-500'
            : ''
        "
      >
        <UIcon
          :name="
            route.meta.name && route.meta.name.includes(nav.route)
              ? nav.active
              : nav.icon
          "
          class="h-5 w-5"
        />
        <h2 class="">
          {{ nav.label }}
        </h2>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
const route = useRoute();
const sidebarRoutes = ref([
  {
    label: "Home",
    route: GP_ROUTES.DASHBOARD.HOME,
    icon: "i-icon-home",
    active: "i-icon-home-active",
  },
  {
    label: "Markets",
    route: GP_ROUTES.MARKET.VENDORS,
    icon: "i-icon-market",
    active: "i-icon-market-active",
  },
  {
    label: "Resturants",
    route: GP_ROUTES.RESTURANT.VENDORS,
    icon: "i-icon-resturant",
    active: "i-icon-resturant-active",
  },
  {
    label: "Orders",
    route: GP_ROUTES.ORDERS.USER,
    icon: "i-icon-carts-orders",
    active: "i-icon-carts-orders",
  },
  {
    label: "Wallet",
    route: GP_ROUTES.WALLETS.USER,
    icon: "i-icon-wallet",
    active: "i-icon-wallet-active",
  },
  {
    label: "Messages",
    route: GP_ROUTES.MESSAGES.USER,
    icon: "i-icon-chat",
    active: "i-icon-chat-active",
  },
  {
    label: "Settings",
    route: GP_ROUTES.SETTINGS.USER,
    icon: "i-icon-settings",
    active: "i-icon-settings-active",
  },
]);
</script>

<style scoped></style>
