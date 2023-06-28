<template>
    <div class="app">
        <sideBar title="123"></sideBar>
        <div class="viewContent">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup lang="ts">
import sideBar from './views/modules/sideBar.vue';
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