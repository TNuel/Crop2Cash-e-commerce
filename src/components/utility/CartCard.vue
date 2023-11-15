<template>
  <div class="px-4 bg-white overflow-hidden w-full">
    <div class="border-b-2 grid grid-cols-1 md:grid-cols-3 pb-6 border-neutral gap-4 mx-auto">
      <div>
        <img
          class="min-w-[150px] min-h-[150px] rounded-[8px] object-cover"
          :src="prop.productDetails.image"
          :alt="prop.productDetails.title"
        />
      </div>
      <div class="text-textPrimary flex flex-col text-center md:text-start space-y-2">
        <div class="font-bold font-urbanist text-lg mb-2">
          {{ prop.productDetails.title }}
        </div>
        <p class="text-sm lg:text-lg font-bold font-urbanist">
          {{
            new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(prop.productDetails.price / 100) ?? 0
          }}
          <span
            class="text-textSecondary/50 text-xs lg:text-sm ml-3 line-through"
            >{{
              new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(prop.productDetails.price / 100) ?? 0
            }}</span
          >
        </p>
        <p class="text-sm lg:text-base text-secondary font-urbanist">
          {{ prop.productDetails.description }}
        </p>
        <div
          class="w-24 h-8 flex justify-between items-center mx-auto md:mx-0 px-2 rounded-lg text-sm lg:text-lg font-semibold font-urbanist leading-9 bg-textSecondary/10"
        >
          <span class="mr-4 cursor-pointer" @click="productQuantity--">-</span> {{ productQuantity }} <span class="ml-4 cursor-pointer" @click="productQuantity++">+</span>
        </div>
      </div>
      <div
        class="flex place-self-end mx-auto md:mx-0 space-x-4 lg:mr-4 justify-between items-center"
      >
        <p class="text-error font-urbanist text-sm lg:text-base">
          Remove Item
        </p>
        <span class="">
          <img src="../../assets/delete_forever.svg" alt="delete icon" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const prop = defineProps({
  image: String,
  title: String,
  description: String,
  price: Number,
  productDetails: {
    type: Object,
    default(rawProps) {
      return { image: "", title: "", description: "", price: 0 };
    },
  },
});

const productQuantity = ref(1);
const productQuantityLowerLimit = ref(1);
const productQuantityUpperLimit = prop.productDetails?.rating?.count;
console.log('product total count', productQuantityUpperLimit);
const addToCart = () => {
  // Implement your add to cart logic here
  console.log("Added to cart:", productsDetails.title);
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
