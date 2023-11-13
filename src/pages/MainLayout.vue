<script setup>
import TopNav from '../components/main-layout/TopNav.vue';
import FooterView from '../components/main-layout/FooterView.vue';
import SideNav from '../components/main-layout/SideNav.vue';
import { ref } from 'vue';

const showSideNav = ref(false);
const toggleShowSideNav = () => {
    console.log('I want to toggle side nav')
    showSideNav.value = !showSideNav.value
};

</script>

<template>
    <div>
        <div>
            <!-- Top Nav -->
            <div>
                <TopNav  @some-event="toggleShowSideNav" />
            </div>
            <!-- Main Content -->
            <main class="h-full overflow-y-auto px-10">
                <router-view />
            </main>
            <!-- Footer -->
            <FooterView class="mt-10" />
        </div>
        <div>
            <SideNav :isOpen="showSideNav" @some-event="toggleShowSideNav" />
        </div>
    </div>
</template>


<style>

</style>