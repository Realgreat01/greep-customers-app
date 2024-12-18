<template>
  <div class="flex flex-col bg-white">
    <NuxtLink
      :to="{ name: GP_ROUTES.DASHBOARD.HOME }"
      class="flex-center flex h-[76px] w-full border-b border-r text-center"
    >
      <img src="/logo/greep-full.svg" alt="" />
    </NuxtLink>

    <div
      class="flex h-[calc(100vh-76px)] max-h-[800px] flex-col gap-2.5 rounded-lg border-r p-4"
    >
      <NuxtLink
        class="flex cursor-pointer items-center gap-x-2 p-2"
        v-for="nav in sidebarRoutes"
        :to="{ name: nav.route }"
        :class="
          route.meta.name && route.meta.name.includes(nav.route)
            ? 'bg-green-50 text-green-500'
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
    label: "Market",
    route: GP_ROUTES.MARKET.VENDORS,
    icon: "i-icon-market",
    active: "i-icon-market-active",
  },
  {
    label: "Resturant",
    route: GP_ROUTES.RESTURANT.VENDORS,
    icon: "i-icon-resturant",
    active: "i-icon-resturant-active",
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
