<template>
    <div class="app">
        <sideBar></sideBar>
        <div class="viewContent">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup lang="ts">
import sideBar from './views/modules/sideBar.vue';
import { onMounted, ref } from 'vue';
onMounted(() => {
    console.log(sideBar)
});
</script>
<style lang="less">
.app {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    .viewContent {
        flex: 1;
    }
}
</style>