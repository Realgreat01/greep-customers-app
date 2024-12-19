<template>
  <div class="flex h-fit !max-w-[980px] items-center gap-x-2">
    <UCarousel
      v-slot="{ item }"
      :items="productTags"
      class="mx-auto w-[90%] rounded-lg"
      :ui="{
        item: 'mx-2.5',
        container: 'rounded-lg',
      }"
      :prev-button="{
        color: 'gray',
        icon: 'i-icon-carousel-left',
        class: '-start-12 -mt-2.5',
      }"
      :next-button="{
        color: 'gray',
        icon: 'i-icon-carousel-right',
        class: '-end-12 -mt-2.5',
      }"
      arrows
    >
      <div
        @click="selectTag(item.id)"
        class="flex-center flex flex-col gap-2 text-center text-xs font-medium"
      >
        <UAvatar
          :src="item.photo?.link ?? placeholderImage"
          :alt="item.title"
          size="lg"
          class="bg-gray-400"
          color="primary"
        />
        <h2 class="first-letter:capitalize">{{ item.title }}</h2>
      </div>
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
import { useInteractionStore } from "~/store/interactions.store";

const router = useRouter();

const placeholderImage = ref(
  "https://development.apis.greep.io/api/storage/development/interactions/tags/1724521682213-frame%2010682%20(1).png",
);
const { productTags, interactionLoadingState } = storeToRefs(
  useInteractionStore(),
);

const selectTag = (tagId: string) => {
  router.push({
    name: GP_ROUTES.DASHBOARD.PRODUCTS_TAG,
    params: { tagId },
  });
};
</script>

<style scoped></style>
