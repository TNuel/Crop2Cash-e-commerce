<script setup>
import { ref } from "vue";
import CartCard from "../utility/CartCard.vue";

const isOpen = ref(false);

const prop = defineProps({
  isOpen: Boolean,
});

const ProductsDetails = ref({
  image:
    "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1600",
  title: "Glass",
  description: "High spectrum lens",
  price: 65423,
});

const toggleNav = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div>
    <div
      class="sidenav fixed top-0 -right-[300px] w-[300px] md:-right-[500px] md:w-[500px] lg:-right-[700px] lg:w-[700px] overflow-y-scroll bg-white transition-left duration-300 ease-in-out"
      :class="{ 'sidenav-open': prop.isOpen }"
    >
      <!-- class="sidenav fixed top-0 right-[-300px] w-300 h-screen bg-white transition-left duration-300 ease-in-out" -->
      <!-- Your side navigation content goes here -->
      <div class="mx-4 lg:my-12">
        <div class="flex justify-between items-center my-6">
          <h1 class="text font-bold text-2xl lg:text-[30px] font-urbanist">
            Your Cart
          </h1>
          <div
            @click="$emit('someEvent')"
            class="flex justify-center rounded-sm bg-secondary/25 hover:bg-secondary/30 hover:scale-105 w-12 h-8 items-center links"
          >
            <img src="../../assets/clear.svg" alt="close" />
          </div>
        </div>
      </div>
      <div>
        <CartCard :productDetails="ProductsDetails" />
      </div>
      <div class="px-4 flex flex-col space-y-6 my-10">
        <div
          class="flex justify-between w-full text-base lg:text-xl text-textSecondary font-urbanist"
        >
          <h1 class="font-bold">Sub-Total</h1>
          <span class="">{{
            new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(2400000 / 100) ?? 0
          }}</span>
        </div>
        <div
          class="flex justify-between w-full text-base lg:text-xl text-textSecondary font-urbanist"
        >
          <h1 class="font-bold">Tax</h1>
          <span class="">{{
            new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(2400000 / 100) ?? 0
          }}</span>
        </div>
        <div
          class="flex justify-between w-full font-bold text-base lg:text-xl text-textSecondary font-urbanist"
        >
          <h1 class="">Total</h1>
          <span class=""
            >={{
              new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(2400000 / 100) ?? 0
            }}</span
          >
        </div>
        <div
          class="w-3/4 px-6 py-3 flex justify-center items-center bg-secondary/80 group rounded-md mx-auto hover:bg-secondary text-white hover:scale-105 border-2 border-secondary80"
        >
          <button @click="addToCart" class="flex items-center space-x-4">
            Proceed to checkout
            <span class="ml-2 hidden md:flex">
              <svg
                class="w-6 h-6 fill-textPrimary group-hover:fill-white"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3417 9.66665H13.8417V9.16665V7.87428L15.9556 9.99582L13.8417 12.1174V10.8333V10.3333H13.3417H4.16671C3.98452 10.3333 3.83337 10.1822 3.83337 9.99998C3.83337 9.81779 3.98452 9.66665 4.16671 9.66665H13.3417Z"
                  fill="white"
                  stroke="white"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="prop.isOpen"
      class="overlay bg-backgroundOverlay/50"
      @click="toggleNav"
    ></div>
  </div>
</template>

<style scoped>
.sidenav {
  /* right: -500px;  */
  /* width: 300px; */
  height: 100vh;
  z-index: 999; /* Ensure the overlay is above other content */
}

.sidenav-open {
  right: 0; /* Slide in when open */
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background:#CED5CF;  */
  z-index: 900; /* Ensure the overlay is above other content */
  cursor: pointer;
}
</style>
