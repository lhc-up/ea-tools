<template>
    <div class="sideBar">{{title}}</div>
</template>

<script setup lang="ts">
import { mapStores } from 'pinia';
import { useCounterStore } from '../../store';
defineProps(['title']);
const store = useCounterStore();
store.increment();
console.log(store.count)
</script>

<style lang="less" scoped>
.sideBar {
    width: 60px;
    background-color: #0D1126;
}
</style>