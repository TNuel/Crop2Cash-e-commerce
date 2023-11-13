<template>
  <div class="relative " v-click-outside="clickedOutside">
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

<script>
export default {
  props: {
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
  },

  data() {
    return {
      showOptions: false,
      chosenOption: "",
      searchTerm: "",
    };
  },

  computed: {
    searchResults() {
      return this.data.filter((item) => {
        return item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    },
  },

  methods: {
    reset() {
      this.$emit("input", "");
      this.chosenOption = "";
    },

    handleInput(evt) {
      this.$emit("input", evt.target.value);
      this.searchTerm = evt.target.value;
      this.showOptions = true;
    },

    clickedOutside() {
      this.showOptions = false;

      if (!this.chosenOption) {
        this.$emit("input", "");
      }
    },
  },
};
</script>

<style scoped>
.mh-48 {
  max-height: 10rem;
}
</style>
