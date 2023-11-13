<!-- Carousel.vue -->
<template>
  <div class="carousel">
    <transition name="fade" mode="out-in">
      <div :key="currentIndex" class="carousel-item">
        <!-- Your content for each carousel item goes here -->
        <img :src="images.currentIndex" alt="Carousel Item" class="w-full" />
      </div>
    </transition>

    <div class="carousel-controls">
      <button @click="prev" class="btn">Previous</button>
      <button @click="next" class="btn">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentIndex = ref(0);
const images = ref([
  "../../assets/Vector1.png",
  "../../assets/Vector2.png",
  "../../assets/Vector3.png",
  "../../assets/Vector4.png",
  "../../assets/Vector5.png",
  // Add more image paths as needed
]);
const next = () => {
    console.log("It's next I pressed")
    currentIndex.value = (currentIndex.value + 1) % images.value.length;
};
const prev = () => {
    console.log("It's prev I pressed")
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
};
</script>

<style scoped>
.carousel {
  position: relative;
  max-width: 800px; /* Adjust as needed */
  margin: auto;
}

.carousel-item {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.carousel-item-enter-active,
.carousel-item-leave-active {
  transition: opacity 0.5s;
}

.carousel-item-enter, .carousel-item-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 1;
}

.carousel-controls {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px;
  background-color: #3490dc;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
