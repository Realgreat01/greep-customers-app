<template>
  <div
    class="sticky top-0 z-[100] flex min-w-full items-center justify-between bg-white px-4 py-2 lg:p-4"
  >
    <NuxtLink :to="{ name: GP_ROUTES.DASHBOARD.HOME }">
      <img src="/logo/greep-full.svg" alt="" class="" />
    </NuxtLink>
    <div class="flex gap-2">
      <UChip
        :text="cart.length"
        :show="cart.length > 0"
        size="2xl"
        position="top-right"
        inset
        color="red"
      >
        <UButton
          @click="openCartModal = true"
          icon="i-icon-cart"
          variant="ghost"
          :padded="true"
        />
      </UChip>
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
            <UButton
              label="Settings"
              icon="i-icon-settings"
              v-if="isLoggedIn"
              block
              @click="openSettingsModal"
              variant="ghost"
            />
          </UCard>
        </template>
      </UPopover>
    </div>

    <UModal v-model="openProfileUpdateModalForm" class="z-[2000]">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <AuthUpdateProfile
          @closeProfileUpdateModal="openProfileUpdateModalForm = false"
        />
      </UCard>
    </UModal>
    <USlideover
      v-model="openProfileSettingsModal"
      :overlay="false"
      class="z-[2000]"
    >
      <SliderProfilePage @updateUserProfile="openProfileUpdateFormModal" />
    </USlideover>
    <USlideover v-model="openCartModal" :overlay="false" class="z-[2000]">
      <SliderCartView
        @open-checkout-modal="openCheckoutDetailsModal"
        @open-full-carts-modal="openPreviewModal"
      />
    </USlideover>

    <USlideover v-model="openFullCartsModal" :overlay="false" class="z-[2000]">
      <SliderVendorCart
        @open-checkout-modal="openCheckoutDetailsModal"
        @close="openFullCartsModal = false"
        :vendorCart="selectedVendorCart"
      />
    </USlideover>

    <USlideover
      v-model="openCheckoutModal"
      :overlay="false"
      prevent-close
      class="z-[2000]"
    >
      <SliderCheckoutDetails
        @close="openCheckoutModal = false"
        @completed="completedOrder"
      />
    </USlideover>
    <USlideover v-model="openRemarksModal" :overlay="false" class="z-[2000]">
      <SliderCheckoutRemarks @close="openRemarksModal = false" />
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
import { useAuthStore } from "~/store/auth.store";
import { useVendorStore } from "~/store/vendor.store";

const openPopup = ref(false);
const { user, isLoggedIn } = storeToRefs(useAuthStore());
const { cart, selectedVendorCart } = storeToRefs(useVendorStore());
const authStore = useAuthStore();
const router = useRouter();

const openProfileUpdateModalForm = ref(false);
const openProfileSettingsModal = ref(false);
const openCartModal = ref(false);
const openCheckoutModal = ref(false);
const openFullCartsModal = ref(false);
const openRemarksModal = ref(false);

const completedOrder = () => {
  openCheckoutModal.value = false;
  openRemarksModal.value = true;
};

const openProfileUpdateFormModal = () => {
  openCartModal.value = false;
  openProfileSettingsModal.value = false;
  openProfileUpdateModalForm.value = true;
};
const openPreviewModal = () => {
  openCartModal.value = false;
  openFullCartsModal.value = true;
};

const openCheckoutDetailsModal = () => {
  openCartModal.value = false;
  openCheckoutModal.value = true;
};

const openSettingsModal = () => {
  openProfileSettingsModal.value = true;
};

const goToLogin = () => {
  if (authStore.isLoggedIn === true) return;
  router.push({ name: GP_ROUTES.LOGIN });
};

onBeforeMount(async () => {
  await authStore.authUser();
});
</script>

<style scoped></style>
