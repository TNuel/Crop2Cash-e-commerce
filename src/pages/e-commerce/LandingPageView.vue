<script setup>
import { ref } from "vue";
import Carousel from "../../components/utility/CarouselView.vue";
import TabsView from "../../components/utility/TabsView.vue";
import ProductCard from "../../components/utility/ProductCard.vue"

const productCategories = ref(['All Categories', 'Electronic', 'Men Clothing', 'Jewellry', 'Women Clothing'])
const ProductsArray = ref([]);
const ProductsDetails = ref({
  id: "65q37jdct73",
  image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1600",
  title: "Glass",
  description: "High spectrum lens",
  price: 65423
});

</script>

<template>
  <div class="my-20 w-full bg-textPrimary/60">
    <Carousel />
  </div>
  <div class="my-10">
    <TabsView :categories="productCategories" />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5">
    <ProductCard :productDetails="ProductsDetails "/>
    <ProductCard :productDetails="ProductsDetails "/>
    <ProductCard :productDetails="ProductsDetails "/>
    <ProductCard :productDetails="ProductsDetails "/>
    <ProductCard :productDetails="ProductsDetails "/>
    <ProductCard :productDetails="ProductsDetails "/>
    <ProductCard :productDetails="ProductsDetails "/>
    <ProductCard :productDetails="ProductsDetails "/>
    <ProductCard :productDetails="ProductsDetails "/>
    <ProductCard :productDetails="ProductsDetails "/>
    <ProductCard :productDetails="ProductsDetails "/>
    <ProductCard :productDetails="ProductsDetails "/>
    <ProductCard :productDetails="ProductsDetails "/>
    <ProductCard :productDetails="ProductsDetails "/>
  </div>
</template>

<style>

</style>