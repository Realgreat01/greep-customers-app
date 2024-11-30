<template>
  <div
    class="my-10 flex w-full flex-col items-center justify-center gap-2 rounded-lg p-10"
  >
    <img src="/icon/empty.svg" alt="" class="block h-20 w-20" />
    <p class="w-full text-center">{{ message }}</p>
    <UButton
      :label="buttonText"
      @click="buttonAction"
      class=""
      v-if="!hideButton"
    />
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";

const router = useRouter();
const props = defineProps({
  message: {
    type: String,
    default: "vendor has not listed any product",
  },
  buttonText: {
    type: String,
    default: "Check other vendors",
  },

  hideButton: Boolean,
});
const buttonAction = () => router.push({ name: GP_ROUTES.DASHBOARD.HOME });
</script>

<style scoped></style>
