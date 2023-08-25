<template>
    <div class="sideBar">
        <div class="menuList">
            <div @click="changeTool(tool)" v-for="tool in toolList" :key="tool.name" :class="['menu', { 'current': tool.uid === currentToolId }]">{{ tool.name }}</div>
            <!-- <div v-for="tool in toolList" :key="tool.name" class="menu current">打包</div> -->
            <!-- <div class="menu">{{entryList.length}}</div> -->
        </div>
        <div class="settings">
            <Icon type="ios-cog-outline" />
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

let currentToolId = ref(toolList[0].uid);

const router = useRouter();
const changeTool = (tool: Tool) => {
    const route = toRaw(router.currentRoute).value;
    if (tool.uid === currentToolId.value && tool.entry.name === route?.name) return;
    router.push(tool.entry);
    currentToolId.value = tool.uid;
}

onMounted(() => {
    changeTool(toolList[0]);
});

</script>

<style lang="less" scoped>
.sideBar {
    position: relative;
    width: 60px;
    background-color: var(--menuBgColor);
    .menuList {
        color: var(--menuFontColor);
        .menu {
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-bottom: 1px solid var(--menuItemBorderColor);
            cursor: pointer;
            &.current, &:hover {
                background-color: var(--menuActiveBgColor);
                color: var(--menuActiveFontColor);
            }
        }
    }
    .settings {
        position: absolute;
        bottom: 20px;
        left: 0;
        width: 60px;
        font-size: 28px;
        color: var(--primaryText);
        text-align: center;
        cursor: pointer;
        &:hover {
            background-color: var(--menuActiveBgColor);
            color: var(--menuActiveFontColor);
        }
    }
}
</style>