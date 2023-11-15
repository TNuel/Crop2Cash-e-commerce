<template>
  <div class="relative" v-click-outside="clickedOutside">
    <input
      :v-model="value"
      @input="$emit('handleInput', value)"
      :placeholder="placeholder"
      :class="inputClass"
    />
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
  // data: {
  //   type: Array,
  //   required: true,
  // },
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

// const searchResults = computed(() => {
//   return props.data.filter((item) => {
//     return item.name.toLowerCase().includes(searchTerm.value.toLowerCase());
//   });
// });

// const reset = () => {
//   props.input = '';
//   chosenOption.value = "";
// };

// const handleInput = (evt) => {
//   // emit("input", evt.target.value);
//   props.input = evt.target.value;
//   searchTerm.value = evt.target.value;
//   showOptions.value = true;
// };

// const clickedOutside = () => {
//   showOptions.value = false;

//   if (!chosenOption.value) {
//     // emit("input", "");
//     props.input = '';
//   }
// };
</script>

<style scoped>
.mh-48 {
  max-height: 10rem;
}
</style>
