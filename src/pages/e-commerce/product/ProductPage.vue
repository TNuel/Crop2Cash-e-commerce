<template>
    <div class="px-4 lg:my-20 bg-white overflow-hidden my-8 w-full">
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="place-self-auto">
          <img
            class=" rounded-[8px] object-cover"
            src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="product image"
          />
        </div>
        <div class="text-textPrimary flex flex-col text-center md:text-start lg:space-y-32 mx-10">
            <div class="flex flex-col my-4 space-y-2 lg:space-y-4">
                <div class="font-bold font-urbanist text-lg mb-2  lg:text-[36px]">
                  Glass
                </div>
                <p class="text-base font-semibold lg:text-[36px] font-urbanist">
                  {{
                    new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(468555597 / 100) ?? 0
                  }}
                  <span
                    class="text-textSecondary/50 text-xs lg:text-sm ml-3 line-through"
                    >{{
                      new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(76495632 / 100) ?? 0
                    }}</span
                  >
                </p>
                <p class="text-sm lg:text-base text-secondary font-urbanist">
                  Glass with a difference
                </p>
                <div class="flex space-x-4 mx-auto md:mx-0 text-sm lg:text-lg font-semibold font-urbanist leading-9">
                  <h1>Quantity:</h1>
                  <div
                    class="w-24 h-8 flex justify-between items-center mx-auto md:mx-0 px-2 rounded-lg text-sm lg:text-lg font-semibold font-urbanist leading-9 bg-textSecondary/10"
                  >
                    <span class="mr-4">-</span> 2 <span class="ml-4">+</span>
                  </div>
                </div>
            </div>
          <div
          class="w-full lg:w-1/3 px-6 py-3 flex justify-center bg-secondary/80 group rounded-xl mt-2 md:mt-0 lg:mt-20 hover:bg-secondary text-white hover:scale-105 border-2 border-secondary80"
        >
          <button @click="addToCart" class="text-base lg:text-lg">
            Add to cart
          </button>
        </div>
        </div>
        <div
          class="hidden place-self-end mx-auto md:mx-0 space-x-4 lg:mr-4 justify-between items-center"
        >
          <p class="text-error font-urbanist text-sm lg:text-base">
            Remove Item
          </p>
          <span class="">
            <img src="../../../assets/delete_forever.svg" alt="delete icon" />
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
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
  const addToCart = () => {
    // Implement your add to cart logic here
    console.log("Added to cart:", productsDetails.title);
  };
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  