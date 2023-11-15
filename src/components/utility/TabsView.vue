<!-- Tabs.vue -->
<template>
  <div class="lg:flex justify-between items-center lg:space-x-4">
    <!-- Tabs for larger screens -->
    <div
      v-if="!isMobile"
      class="flex w-full justify-between items-center space-x-4"
    >
      <div
        v-for="(category, index) in categories"
        :key="index"
        :class="{ 'bg-secondary text-white': activeTab === index }"
        @click="changeTab(index, category)"
        class="cursor-pointer px-4 hover:px-6 py-2 hover:text-white capitalize hover:bg-textPrimary rounded-lg transition duration-300 text-sm text-left lg:text-base font-semibold inline-flex tracking-tight text-textSecondary leading-none"
      >
        {{ category }}
      </div>
    </div>

    <!-- Dropdown select for mobile screens -->
    <div v-else>
      <select
        @change="changeCategory($event)"
        v-model="activeTab"
        class="block w-full p-3 text-lg text-left border-2 border-textSecondary rounded-md capitalize font-semibold bg-white links tracking-tight text-textSecondary leading-none"
      >
        <option
          v-for="(category, index) in categories"
          :key="index"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useProductStore } from "../../stores/product";

const productStore = useProductStore();
const isLoading = ref(false);
const isMobile = ref(false);
const categoryArr = ref([
  "All Categories",
]);
const activeTab = ref(categoryArr.value[0]);
const categories = ref([]);

const emit = defineEmits({
  // No validation
  click: null,

  // Validate submit event
  getProductsByCategory: (category) => {
    if (category) {
      console.log('from tab view =>',category);
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

// function submitForm(email, password) {
//   emit('submit', { email, password })
// }

const getAllCategories = async () => {
  isLoading.value = true;
  try {
    const res = await productStore.getProductCategories();
    console.log("product response =>", res);
    isLoading.value = false;
    const result = res.data
    categories.value = [ ...categoryArr.value, ...result]
  } catch (error) {
    console.log("product error =>", error);
    isLoading.value = false;
    throw error;
  }
};

const changeCategory = (event) => {
  console.log('on mobile screen the category =>', event.target.value);
  const currentCategory = event.target.value;
  emit('getProductsByCategory', currentCategory )
};

const changeTab = (index, currentCategory) => {
  activeTab.value = index;
  emit('getProductsByCategory', currentCategory );
};
const updateScreenSize = () => {
  isMobile.value = window.innerWidth <= 640;
};
onMounted(() => {
  getAllCategories();
  updateScreenSize();
  window.addEventListener("resize", updateScreenSize());
});
// beforeDestroy(() => {
//   window.removeEventListener("resize", updateScreenSize());
// });
</script>

<style scoped>
/* Add component-specific styles here */
/* You can customize the styles based on your design */
</style>
