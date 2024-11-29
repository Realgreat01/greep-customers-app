<template>
  <div
    class="sticky top-0 z-[100] flex min-w-full items-center justify-between bg-white px-4 py-2 lg:p-4"
  >
    <NuxtLink :to="{ name: GP_ROUTES.DASHBOARD.HOME }">
      <img src="/logo/greep-full.svg" alt="" class="" />
    </NuxtLink>
    <div class="flex gap-2">
      <div class="hidden px-4 text-end lg:block">
        <h2 class="font-semibold">
          <span class="" v-if="isLoggedIn">
            {{
              user?.allNames.full !== "" ? user?.allNames.full : "New User"
            }}</span
          >
          <span class="" v-else>Guest</span>
        </h2>
        <p class="text-gray text-xs font-light text-gray-500">Customer</p>
      </div>

      <UPopover v-model:open="openPopup">
        <UAvatar
          size="lg"
          class="bg-blue-500"
          :src="user?.photo?.link"
          :alt="user?.allNames?.full ?? 'John Doe'"
          @click="goToLogin"
          :ui="{
            placeholder: 'text-gray-100 ',
          }"
        />

        <template #panel>
          <UCard
            class="flex flex-col"
            :ui="{
              base: 'grid gap-2',
              body: {
                padding: 'px-4 py-4 sm:p-0 sm:px-3 sm:py-3',
              },
            }"
          >
            <UButton
              label="Login"
              icon="i-icon-login"
              block
              variant="ghost"
              class="text-brand-500"
              @click="goToLogin"
              v-if="!isLoggedIn"
            />
            <UButton
              v-else
              label="Logout"
              icon="i-icon-logout"
              block
              @click="authStore.logout"
              variant="ghost"
              class="text-red-500"
            />
          </UCard>
        </template>
      </UPopover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
import { useAuthStore } from "~/store/auth.store";

const openPopup = ref(false);
const { user, isLoggedIn } = storeToRefs(useAuthStore());
const authStore = useAuthStore();
const router = useRouter();

const goToLogin = () => {
  if (authStore.isLoggedIn === true) return;
  router.push({ name: GP_ROUTES.LOGIN });
};

onBeforeMount(async () => {
  await authStore.authUser();
});
</script>

<style scoped></style>
