<template>
    <div class="subpage">
        <Breadcrumb class="crumb">
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem>添加任务</BreadcrumbItem>
        </Breadcrumb>
        <div class="mainContent">
            <div class="contentItem contentLeft">
                <Collapse v-model="current">
                    <Panel v-for="fnModule in moduleList" :key="fnModule.type" :name="fnModule.type">
                        {{ fnModule.type }}
                        <template #content>
                            <div>
                                基础内容
                                <Collapse accordion v-model="currentChild">
                                    <Panel v-for="fn in fnModule.list" :key="fn.longname" :name="fn.longname">
                                        {{ fn.longname }}
                                        <template #content>{{ fn.description }}</template>
                                    </Panel>
                                </Collapse>
                            </div>
                        </template>
                    </Panel>
                </Collapse>
            </div>
            <div class="contentItem contentRight"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import fs from 'fs';
import path from 'path';
const current = ref('1');
const currentChild = ref('1-1');
const isDev = process.env.NODE_ENV === 'development';
// jsdoc文件夹地址
const dir = isDev 
    ? path.join(process.cwd(), 'src/render/views/tools/wordFix/libs/jsdoc') 
    : path.join(process.resourcesPath, 'jsdoc');
const { moduleList } = eval('require')(path.join(dir, 'js/tools.js'));
console.log(moduleList);

</script>
<style lang="less" scoped>
.subpage {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    .crumb {
        margin-bottom: 16px;
    }
    .mainContent {
        flex: 1;
        display: flex;
        justify-content: space-between;
        .contentItem {
            width: calc(50% - 5px);
            border-radius: 6px;
            background-color: var(--contentBackground);
        }
    }
}
</style>
