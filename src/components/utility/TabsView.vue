<!-- Tabs.vue -->
<template>
  <div class="lg:flex justify-between items-center lg:space-x-4 ">
    <!-- Tabs for larger screens -->
    <div v-if="!isMobile" class="flex w-full justify-between items-center space-x-4">
      <div
        v-for="(category, index) in categories"
        :key="index"
        :class="{ 'bg-secondary text-white': activeTab === index }"
        @click="changeTab(index)"
        class="cursor-pointer px-4 hover:px-6 py-2 hover:text-white hover:bg-textPrimary rounded-lg transition duration-300 text-sm text-left lg:text-base font-semibold inline-flex tracking-tight text-textSecondary leading-none "
      >
        {{ category }}
      </div>
    </div>

    <!-- Dropdown select for mobile screens -->
    <div v-else>
      <select v-model="activeTab" class="block w-full p-2 text-sm text-left lg:text-base font-semibold links tracking-tight text-textSecondary leading-none ">
        <option
          v-for="(category, index) in categories"
          :key="index"
          :value="index"
        >
          {{ category }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeTab: 0,
      isMobile: false,
    };
  },
  methods: {
    changeTab(index) {
      this.activeTab = index;
    },
    updateScreenSize() {
      this.isMobile = window.innerWidth <= 640;
    },
  },
  mounted() {
    this.updateScreenSize();
    window.addEventListener("resize", this.updateScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateScreenSize);
  },
};
</script>

<style scoped>
/* Add component-specific styles here */
/* You can customize the styles based on your design */
</style>
