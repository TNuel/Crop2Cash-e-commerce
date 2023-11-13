<!-- Your Slide Component -->
<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

onMounted(() => {
  useSlide();
});

defineOptions({
  inheritAttrs: false
});

defineProps({
  dataSlideMotion: {
    type: String,
    default: 'slide'
  }
});
</script>

<template>
  <div class="relative" :data-slide-motion="dataSlideMotion">
    <div class="slides-container grid grid-flow-col auto-cols-max gap-4 overflow-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth touch-manipulation"
      data-slide-container v-bind="$attrs">
      <slot></slot>
      <!-- Slider controls -->
      <slot name="slide-controls">
        <button type="button" class="slide-control" @click="prevSlide" data-slide-previous>
          <!-- Previous Button Content -->
        </button>
        <button type="button" class="slide-control" @click="nextSlide" data-slide-next>
          <!-- Next Button Content -->
        </button>
      </slot>
    </div>
  </div>
</template>

<style scoped>
:slotted(div) {
  @apply snap-center;
}
</style>

<script setup>
import { ref } from 'vue';

const slideDistance = window.innerWidth / 1.5;
const containerRef = ref(null);

const nextSlide = () => {
  containerRef.value.scrollLeft += slideDistance;
};

const prevSlide = () => {
  containerRef.value.scrollLeft -= slideDistance;
};

onMounted(() => {
  const intervalId = setInterval(nextSlide, 5000);

  onBeforeUnmount(() => {
    clearInterval(intervalId);
  });
});
</script>
