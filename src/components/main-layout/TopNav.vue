<script setup>
import SearchComponent from "../utility/SearchComponent.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { useProductStore } from "../../stores/product";

const router = useRouter();
const authStore = useAuthStore();
const productStore = useProductStore();
const showOtherNavLinks = ref(false);
const searchQuery = ref("");
const isLoading = ref(false);

console.log("auth store =>", authStore);
const handleLogout = () => {
  router.push(`/`);
  localStorage.removeItem("tokenData");
  authStore.logout();
};

const searchResults = () => {
  const data = productStore.products;
  console.log('product store =>', productStore);
  console.log('products from store =>', data);
  return data.filter((item) => {
    return item.title.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
};

const sortProduct = async () => {
  console.log('there here');
  console.log('search query  =>', searchQuery.value);
  isLoading.value = true;
  try {
    const res = await productStore.sortProduct(searchQuery.value);
    console.log("sort product response =>", res);
  } catch (error) {
    console.log("sort product error =>", error);
    throw error;
  }
};

const showMobileSearchField = ref(false);
const toggleMobileSearchField = () => {
    console.log('I want to toggle side nav')
    showMobileSearchField.value = !showMobileSearchField.value
};

const routeToMainPage = () => {
  router.push("/main");
};
</script>

<template>
  <nav class="bg-white dark:bg-textPrimary/20">
    <div
      class="max-w-screen-xl flex items-center justify-between mx-auto p-4 md:py-10 md:px-6 lg:px-12"
    >
      <div>
        <router-link to="/main" class="flex items-center space-x-3">
          <img
            src="../../assets/Logo.svg"
            class="hidden md:flex lg:scale-110"
            alt="Crop2Cash Logo"
          />
          <img
            src="../../assets/Logo.png"
            class="md:hidden w-6 h-6"
            alt="Crop2Cash Logo"
          />
        </router-link>
      </div>
      <div class="hidden md:flex items-center space-x-2 w-1/2">
        <!-- Search Bar -->
        <div class="hidden lg:block w-full space-x-4 mx-3">
          <!-- <SearchComponent /> -->
          <div>
            <form class="flex space-x-4" @submit.prevent="searchResults">
              <div class="relative w-full">
                <div
                  class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                >
                  <svg
                    class="w-5 h-5"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.9951 12.2584V12.1667H13.0867H13.5373L16.924 15.5694L16.9248 15.5703C17.0713 15.7167 17.0713 15.9584 16.9248 16.1048C16.7784 16.2512 16.5367 16.2512 16.3903 16.1048L12.9951 12.7096V12.2584ZM12.4738 11.1163L12.2296 11.4012L11.9447 11.6454C10.8846 12.554 9.44102 13.0227 7.90329 12.7653C5.80439 12.4104 4.12299 10.6527 3.86642 8.53976L3.86633 8.53903C3.47268 5.33681 6.16518 2.64431 9.3674 3.03796L9.36813 3.03805C11.4811 3.29462 13.2388 4.97602 13.5937 7.07492C13.8511 8.61265 13.3824 10.0563 12.4738 11.1163ZM4.49507 7.9167C4.49507 10.2678 6.39393 12.1667 8.74507 12.1667C11.0962 12.1667 12.9951 10.2678 12.9951 7.9167C12.9951 5.56556 11.0962 3.6667 8.74507 3.6667C6.39393 3.6667 4.49507 5.56556 4.49507 7.9167Z"
                      fill="#323232"
                      stroke="#96A397"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="w-full pl-16 py-2 text-sm lg:text-base rounded-md ld:rounded-xl border-2 md:rounded-lg border-textPrimary/75 transition hover:border-textPrimary focus:border-secondary/80 active:border-secondary/70 disabled:border-textPrimary/40"
                  placeholder="Search for Staff"
                  v-model="searchQuery"
                />
                <!-- @input="getStaffBySearch()" -->
              </div>
              <button
                class="px-3 lg:px-6 lg:flex justify-center items-center py-2 rounded-md ld:rounded-xl bg-secondary hover:scale-105 transition hover:bg-textPrimary focus:bg-secondary/80 active:bg-secondary/70 disabled:bg-textPrimary/40"
              >
                <span class="font-semibold text-white text-sm lg:text-base"
                  >Search</span
                >
              </button>
            </form>
          </div>
        </div>

        <!-- End of search bar -->
      </div>
      <!-- Nav Links -->
      <div class="flex flex-row space-x-8">
        <div
          class="flex justify-center lg:hidden items-center links"
          @click="toggleMobileSearchField"
        >
          <div
            class="flex justify-center items-center w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-secondary/20"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.9951 12.2584V12.1667H13.0867H13.5373L16.924 15.5694L16.9248 15.5703C17.0713 15.7167 17.0713 15.9584 16.9248 16.1048C16.7784 16.2512 16.5367 16.2512 16.3903 16.1048L12.9951 12.7096V12.2584ZM12.4738 11.1163L12.2296 11.4012L11.9447 11.6454C10.8846 12.554 9.44102 13.0227 7.90329 12.7653C5.80439 12.4104 4.12299 10.6527 3.86642 8.53976L3.86633 8.53903C3.47268 5.33681 6.16518 2.64431 9.3674 3.03796L9.36813 3.03805C11.4811 3.29462 13.2388 4.97602 13.5937 7.07492C13.8511 8.61265 13.3824 10.0563 12.4738 11.1163ZM4.49507 7.9167C4.49507 10.2678 6.39393 12.1667 8.74507 12.1667C11.0962 12.1667 12.9951 10.2678 12.9951 7.9167C12.9951 5.56556 11.0962 3.6667 8.74507 3.6667C6.39393 3.6667 4.49507 5.56556 4.49507 7.9167Z"
                fill="#323232"
                stroke="#2B8C34"
              />
            </svg>
          </div>
          <div
            class="hidden lg:ml-4 ml-2 text-sm lg:text-base font-semibold tracking-tight text-textSecondary leading-none"
          >
            Cart
          </div>
        </div>
        <div
          class="flex justify-center items-center links"
          @click="$emit('someEvent')"
        >
          <div
            class="flex justify-center items-center w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-secondary/20"
          >
            <img
              src="../../assets/shopping_bag.svg"
              class="md:scale-90"
              alt="Cart"
            />
          </div>
          <div
            class="lg:ml-4 ml-2 text-sm lg:text-base font-semibold tracking-tight text-textSecondary leading-none"
          >
            Cart
          </div>
        </div>
        <div
          class="flex justify-center items-center links"
          @click="showOtherNavLinks = !showOtherNavLinks"
        >
          <div
            class="flex justify-center items-center w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-secondary/20"
          >
            <img src="../../assets/user.svg" class="" alt="Account" />
          </div>
          <div
            class="lg:ml-4 ml-2 text-sm lg:text-base font-semibold tracking-tight text-textSecondary leading-none flex flex-col"
          >
            Account
          </div>
          <div class="lg:mx-3 mx-1">
            <img
              src="../../assets/keyboard_arrow_down.svg"
              class="md:w-4 md:h-4 w-3 h-3"
              alt="arrow down"
            />
          </div>
        </div>
        <div
          v-show="showOtherNavLinks"
          class="fixed inset-0 z-10 w-full h-full"
          @click="showOtherNavLinks = false"
        />
        <div
          v-show="showOtherNavLinks"
          class="absolute right-5 md:right-10 top-20 z-20 w-64 py-2 px-3 mt-2 bg-gray-100 border rounded-md"
        >
          <div class="flex flex-col space-y-6 bg-white py-2 px-3">
            <div class="flex items-center links">
              <img src="../../assets/wallet.svg" alt="Wallet" />
              <div
                class="ml-4 text-sm text-left lg:text-base font-semibold tracking-tight text-textSecondary leading-none flex flex-col"
              >
                Wallet
              </div>
            </div>
            <div class="flex items-center links">
              <img src="../../assets/user.svg" alt="Account" />
              <div
                class="ml-4 text-sm text-left lg:text-base font-semibold tracking-tight text-textSecondary leading-none flex flex-col"
              >
                Account
              </div>
            </div>
            <div class="flex items-center links">
              <img src="../../assets/heart.svg" alt="Saved" />
              <div
                class="ml-4 text-sm text-left lg:text-base font-semibold tracking-tight text-textSecondary leading-none"
              >
                Saved
              </div>
            </div>
            <div class="flex items-center links" @click="routeToMainPage">
              <img src="../../assets/card_travel.svg" alt="Orders" />
              <div
                class="ml-4 text-sm text-left lg:text-base font-semibold inline-flex tracking-tight text-textSecondary leading-none"
              >
                Orders
              </div>
            </div>
            <div>
              <button
                @click="handleLogout"
                class="flex w-full items-center links"
              >
                <svg
                  class="w-4 h-4 text-secondary"
                  viewBox="0 0 36 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.18182 14.85H21.2727V18.15H8.18182V23.1L0 16.5L8.18182 9.9V14.85ZM6.54545 26.4H10.9767C12.8662 28.0803 15.1964 29.1751 17.6877 29.553C20.1789 29.931 22.7254 29.5762 25.0216 28.531C27.3178 27.4858 29.2662 25.7947 30.6328 23.6607C31.9995 21.5267 32.7265 19.0403 32.7265 16.5C32.7265 13.9597 31.9995 11.4733 30.6328 9.33931C29.2662 7.20527 27.3178 5.5142 25.0216 4.46902C22.7254 3.42385 20.1789 3.06896 17.6877 3.44695C15.1964 3.82494 12.8662 4.91975 10.9767 6.6H6.54545C8.06835 4.54934 10.0445 2.88505 12.317 1.73934C14.5895 0.593629 17.0957 -0.00192001 19.6364 4.65017e-06C28.674 4.65017e-06 36 7.38705 36 16.5C36 25.6129 28.674 33 19.6364 33C17.0957 33.0019 14.5895 32.4064 12.317 31.2607C10.0445 30.115 8.06835 28.4507 6.54545 26.4Z"
                    fill="currentColor"
                  />
                </svg>
                <div
                  class="ml-4 text-sm text-left lg:text-base font-semibold inline-flex tracking-tight text-textSecondary leading-none"
                >
                  Logout
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mb-3 lg:hidden" v-if="showMobileSearchField">
      <SearchComponent placeholder="Search Product" @handle-input="sortProduct(value)" :value="searchQuery" />
    </div>
  </nav>
</template>
