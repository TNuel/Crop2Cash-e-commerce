<script setup>
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { useCartStore } from "../../stores/cart";

const cartStore = useCartStore();
const isOpen = ref(false);

const prop = defineProps({
  isOpen: Boolean,
});

const isLoading = ref(false);

const productsDetails = computed(() => {
  return cartStore.addToCartArray
});

// const productsDetails = ref(cartStore.addToCartArray)
console.log(productsDetails.value);
const subTotal = ref(0);
const vat = ref(0);

// const itemsInCartArray = ref([]);

const removeProductFromCart = (product) => {

// Implement your add to cart logic here
const indexToRemove = productsDetails.value.findIndex(obj => obj.id === product.id)
// deleteObject.slice(obj)
if(indexToRemove !== -1){

  // Update the property before removing the object
  productsDetails.value[indexToRemove].isDisabled = false;
  // Remove the object at the found index
  productsDetails.value.splice(indexToRemove, 1);
}
console.log("remove from cart:", productsDetails.value);
};

const getProductsInCart = async () => {
  isLoading.value = true;
  console.log("get here ...............");
  try {
    const res = await cartStore.getCarts();
    console.log("get products in cart =>", res);
    const priceTotal = cartStore.addToCartArray.map((product) => product.price);
    console.log("price total =>", priceTotal);
    subTotal.value = priceTotal.reduce((sum, price) => sum + price, 0);
    console.log("sub total =>", subTotal.value);
    vat.value = subTotal.value / 1000;
    console.log("vat =>", vat.value);
    // productsDetails.value = cartStore.addToCartArray;
    // console.log("==============>>>>>>>>>>>>>", productsDetails.value);
    // console.log("==============>>>>>>>>>>>>>", cartStore.addToCartArray);
  } catch (error) {
    console.log("get products in cart error =>", error);
    throw error;
  }
};


watchEffect(() => {
  if (productsDetails.value.length > 0) {
    // do something when data is loaded
    console.log(productsDetails.value.length);
    getProductsInCart();
  }
});

const toggleNav = async () => {
  await getProductsInCart();
  isOpen.value = !isOpen.value;
};

onMounted(() => {
  getProductsInCart();
});
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
        <div v-if="productsDetails.length > 0">
          <div
            class="px-4 bg-white overflow-hidden w-full"
            v-for="item in productsDetails"
            :key="item.id"
          >
            <div
              class="border-b-2 grid grid-cols-1 md:grid-cols-3 mt-6 pb-6 border-neutral gap-4 mx-auto"
            >
              <div>
                <img
                  class="min-w-[150px] h-48 rounded-[8px] object-cover"
                  :src="item.image"
                  :alt="item.title"
                />
              </div>
              <div
                class="text-textPrimary flex flex-col text-center md:text-start space-y-2"
              >
                <div class="font-bold font-urbanist text-lg mb-2">
                  {{ item.title }}
                </div>
                <p class="text-sm lg:text-lg font-bold font-urbanist">
                  {{
                    new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(item.price * item.quantity) ?? 0
                  }}
                  <span
                    class="text-textSecondary/50 text-xs lg:text-sm ml-3 line-through"
                    >{{
                      new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(item.price* item.quantity / 100) ?? 0
                    }}</span
                  >
                </p>
                <div
                  class="w-24 h-8 flex justify-between items-center mx-auto md:mx-0 px-2 rounded-lg text-sm lg:text-lg font-semibold font-urbanist leading-9 bg-textSecondary/10"
                >
                  <button
                    class="mr-4 cursor-pointer disabled:text-gray-300"
                    :disabled="item.quantity === 1"
                    @click="item.quantity--"
                  >
                    -
                  </button>
                  {{ item.quantity }}
                  <button
                    class="ml-4 cursor-pointer disabled:text-gray-300"
                    :disabled="item.quantity === 10"
                    @click="item.quantity++"
                  >
                    +
                  </button>
                </div>
              </div>
              <div
                @click="removeProductFromCart(item)"
                class="flex place-self-end mx-auto md:mx-0 space-x-4 cursor-pointer hover:scale-105 lg:mr-4 justify-between items-center"
              >
                <p class="text-error font-urbanist text-sm lg:text-base">
                  Remove Item
                </p>
                <span class="">
                  <img
                    src="../../assets/delete_forever.svg"
                    alt="delete icon"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <span
            class="font-bold font-urbanist text-textSecondary mx-6 text-lg mb-2 lg:text-[36px] italic"
            >No Item in Cart</span
          >
        </div>
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
            }).format(subTotal) ?? 0
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
            }).format(vat) ?? 0
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
              }).format(subTotal + vat) ?? 0
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
