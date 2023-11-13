<script setup>
// import { defineProps, computed, Teleport, ref } from "vue";


const prop = defineProps({
    src: String,
    navText: String,
});
</script>

<template>
    <div class="flex">
        <div class="flex justify-center items-center w-10 h-10 rounded-full bg-secondary/50">
            <img :src="prop.src" :alt="navText">
        </div>
        <div class="ml-4 text-xl font-bold tracking-tight leading-none flex flex-col">{{ prop.navText }}</div>
    </div>
</template>