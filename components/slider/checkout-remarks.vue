<template>
  <UCard
    class="hide-scrollbar"
    :ui="{
      divide: 'divide-white ',
      shadow: 'shadow-none',
    }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="invisible">.</h3>
        <UIcon
          size="3xl"
          class="h-6 w-6 cursor-pointer"
          name="i-icon-cancel"
          @click="closeSlider"
        />
      </div>
    </template>
    <div class="flex h-[60vh] items-center justify-center lg:h-screen">
      <div class="m-auto flex flex-col items-center justify-center gap-20">
        <h2 class="text-center text-xl font-bold">
          Thank You for Trusting <br />Greep! 🙌
        </h2>

        <div class="flex flex-col items-center justify-center gap-2">
          <UButton
            :ui="{ rounded: 'rounded-full' }"
            class="flex h-16 w-16 items-center justify-center bg-green-500"
          >
            <UIcon name="i-icon-checkbox-tick" class="h-12 w-12 bg-white" />
          </UButton>
          <h2 class="text-2xl font-bold">Order Processed</h2>
          <p class="-mt-2 text-xs font-light text-gray-400">
            Thanks for using our ordering service
          </p>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const emits = defineEmits(["close"]);

const closeSlider = () => {
  emits("close");
};
</script>

<style scoped></style>
