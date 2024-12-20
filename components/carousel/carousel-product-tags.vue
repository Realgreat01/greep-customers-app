<template>
  <div class="flex h-fit items-center gap-x-2 lg:w-[1040px] 2xl:w-[1280px]">
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
        @click="selectTag(item?.id)"
        class="flex-center flex flex-col gap-2 text-center text-xs font-medium"
      >
        <UAvatar
          :src="item?.photo?.link ?? placeholderImage"
          :alt="item?.title"
          size="lg"
          class="bg-gray-400"
          color="primary"
        />
        <h2 class="first-letter:capitalize">{{ item?.title }}</h2>
      </div>
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { GP_ROUTES } from "~/constants/routes";
import { useInteractionStore } from "~/store/interactions.store";
import type { TagEntity } from "~/types/product";

const router = useRouter();
const { interactionLoadingState } = storeToRefs(useInteractionStore());

const props = defineProps({
  productTags: {
    type: Object as PropType<TagEntity[]>,
    required: true,
  },
  route: {
    type: String,
    default: GP_ROUTES.DASHBOARD.PRODUCTS_TAG,
  },
});

const placeholderImage = ref(
  "https://development.apis.greep.io/api/storage/development/interactions/tags/1724521682213-frame%2010682%20(1).png",
);

const selectTag = (tagId: string) => {
  router.push({
    name: props.route,
    params: { tagId },
  });
};
</script>

<style scoped></style>
