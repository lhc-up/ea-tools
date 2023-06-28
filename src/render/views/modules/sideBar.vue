<template>
    <div class="sideBar">
        <div class="menuList">
            <div @click="changeTool(tool)" v-for="tool in toolList" :key="tool.name" :class="['menu', { 'current': tool.uid === currentTool.uid }]">{{ tool.name }}</div>
            <!-- <div v-for="tool in toolList" :key="tool.name" class="menu current">打包</div> -->
            <!-- <div class="menu">{{entryList.length}}</div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue';
import { toolService } from '../../../services/tool';
import { Tool } from '../tools/tool';
import { useRouter } from 'vue-router';
defineProps(['title']);

const toolList = toolService.toolList;
ref(toolList);

let currentTool: Tool = toolList[0];

const router = useRouter();
const changeTool = (tool: Tool) => {
    const route = toRaw(router.currentRoute).value;
    if (tool.uid === currentTool.uid && tool.entry.name === route?.name) return;
    currentTool = tool;
    router.push(tool.entry);
}

onMounted(() => {
    changeTool(toolList[0]);
});

</script>

<style lang="less" scoped>
.sideBar {
    width: 60px;
    background-color: #0D1126;
    .menuList {
        color: #bfbfbf;
        .menu {
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-bottom: 1px solid #353F6E;
            cursor: pointer;
            &.current, &:hover {
                background-color: #353F6E;
                color: #fff;
            }
        }
    }
}
</style>