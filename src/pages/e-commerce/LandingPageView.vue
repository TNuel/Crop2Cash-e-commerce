<script setup>
import { computed, onMounted, ref } from "vue";
import Carousel from "../../components/utility/carousel/CarouselView.vue";
import TabsView from "../../components/utility/TabsView.vue";
import ProductCard from "../../components/utility/ProductCard.vue";
import { useProductStore } from "../../stores/product";

const productStore = useProductStore();
const isLoading = ref(false);

const productCategories = ref([
  "All Categories",
  "Electronic",
  "Men Clothing",
  "Jewellry",
  "Women Clothing",
]);
const filteredProductsArry = ref([]);
const productsArray = ref([]);


const getProductsByCategory = async (category) => {
  isLoading.value = true;
  console.log("is getting here on landing page", category);
  if(category == "All Category") {
    getAllProducts();
  } else {
    productsArray.value = [];
    try {
      const res = await productStore.sortProductsByCategory(category);
      console.log("product response =>", res);
      isLoading.value = false;
      filteredProductsArry.value = res.data;
    } catch (error) {
      console.log("product error =>", error);
      isLoading.value = false;
      throw error;
    }
  }
};

const getAllProducts = async () => {
  isLoading.value = true;
  try {
    const res = await productStore.getProducts();
    console.log("product response =>", res);
    isLoading.value = false;
    const result = res.data;
    console.log("all product response on landing page =>", result);
    productsArray.value = result;
    productStore.setProduct(productsArray.value)
  } catch (error) {
    console.log("product error =>", error);
    isLoading.value = false;
    throw error;
  }
};

const slides= ref([
      "https://picsum.photos/id/1032/900/400",
      "https://picsum.photos/id/1033/900/400",
      "https://picsum.photos/id/1037/900/400",
      "https://picsum.photos/id/1035/900/400",
      "https://picsum.photos/id/1036/900/400",
    ]);

onMounted(() => {
  getAllProducts();
});
</script>

<template>
  <div>
    <div class="my-20">
      <!-- <SliderItem :slide="productsArray" /> -->
      <carousel :slides="slides" :interval="4000" controls indicators></carousel>
    </div>
    <div>
      <div class="my-10">
        <TabsView :categories="productCategories" @getProductsByCategory="getProductsByCategory" />
      </div>
      <div v-if="isLoading" class="text-center w-full">
        <span class="font-bold font-urbanist text-textSecondary mx-6 text-lg mb-2 lg:text-[36px] italic">Fetching Product ...</span>
        <svg
          aria-hidden="true"
          class="mx-auto w-8 h-8 text-gray-200 inline-flex items-center animate-spin dark:text-gray-600 fill-secondary"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-10 gap-5 lg:gap-10"
      >
      <!-- All product without filter -->
      <ProductCard v-if="productsArray" :products="productsArray" />
      <!-- Filtered products -->
        <ProductCard v-if="filteredProductsArry" :products="filteredProductsArry" />
      </div>
    </div>
  </div>
</template>

<style></style>
