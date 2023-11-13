<template>
  <div class="relative" v-click-outside="clickedOutside">
    <input
      :value="value"
      @input="handleInput"
      :placeholder="placeholder"
      ref="input"
      tabindex="0"
      :class="inputClass"
    />
    <span
      v-if="value"
      @click.prevent="reset()"
      class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
    >
      x
    </span>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  value: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
    default: "Enter text here.",
  },
  data: {
    type: Array,
    required: true,
  },
  inputClass: {
    type: String,
    required: false,
    default:
      "border border-gray-300 py-2 px-3 rounded-md max-w-7xl focus:outline-none focus:shadow-outline",
  },
});

const showOptions = ref(false);
const chosenOption = ref("");
const searchTerm = ref("");

const searchResults = computed(() => {
  return props.data.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.value.toLowerCase());
  });
});

const reset = () => {
  this.$emit("input", "");
  chosenOption.value = "";
};

const handleInput = (evt) => {
  $emit("input", evt.target.value);
  searchTerm.value = evt.target.value;
  showOptions.value = true;
};

const clickedOutside = () => {
  showOptions.value = false;

  if (!chosenOption.value) {
    $emit("input", "");
  }
};
</script>

<style scoped>
.mh-48 {
  max-height: 10rem;
}
</style>
