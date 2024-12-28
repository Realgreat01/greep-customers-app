<template>
  <div>
    <USkeleton class="h-12 w-[420px]" v-if="loading" />
    <template v-else-if="backType">
      <div class="flex items-center">
        <UButton
          variant="ghost"
          label="Back"
          @click="router.go(-1)"
          class="mr-2 font-medium"
          icon="i-icon-arrow-left"
        />
        <nuxt-link
          :to="route.route"
          v-for="(route, i) in routes"
          class="flex text-xs text-[#999999]"
        >
          {{ route.title }}
          <span class="" v-if="i !== routes.length - 1">/</span>
        </nuxt-link>
      </div>
    </template>
    <template v-else>
      <div class="flex">
        <nuxt-link
          :to="route.route"
          v-for="(route, i) in routes"
          :class="
            small ? 'text-base font-normal' : 'text font-semibold md:text-2xl'
          "
          >{{ route.title }}
          <span class="mx-1 lg:mx-2" v-if="i !== routes.length - 1"
            >></span
          ></nuxt-link
        >
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationNamedRaw, RouteLocationPathRaw } from "vue-router";
const router = useRouter();

interface Routes {
  route: RouteLocationPathRaw | RouteLocationNamedRaw;
  title: string;
}

defineProps({
  routes: { type: Array as PropType<Routes[]>, required: true },
  loading: Boolean,
  small: Boolean,
  backType: Boolean,
});
</script>

<style scoped></style>
