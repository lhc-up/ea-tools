<template>
    <div class="subpage">
        <Breadcrumb class="crumb">
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem>添加任务</BreadcrumbItem>
        </Breadcrumb>
        <div class="mainContent">
            <div class="contentItem contentLeft">
                <funcViewer :list="moduleList" @on-use="onUseFunc"></funcViewer>
            </div>
            <div class="contentItem contentRight">
                <div class="flowContent">
                    <p class="flowTitle">选择左侧对应的方法，组织任务流程</p>
                    <p class="flowDesc">正常情况下，每一项为一个待刷点且相互独立，前后项之间无严格的顺序要求。</p>
                    <draggable class="flowList" group="func" v-model="selectList" @start="drag=true" @end="drag=false" item-key="name">
                        <template #item="{element}">
                            <div class="flowItem">{{ element.longname }}</div>
                        </template>
                    </draggable>
                </div>
                <!-- <div class="codePreview"></div> -->
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import fs from 'fs';
import path from 'path';
import draggable from 'vuedraggable';
import funcViewer from '../components/funcViewer.vue';
const current = ref('1');
const currentChild = ref('1-1');
const isDev = process.env.NODE_ENV === 'development';
// jsdoc文件夹地址
const dir = isDev 
    ? path.join(process.cwd(), 'src/render/views/tools/wordFix/libs/jsdoc') 
    : path.join(process.resourcesPath, 'jsdoc');
const { moduleList } = eval('require')(path.join(dir, 'js/tools.js'));
console.log(moduleList);

let selectList = ref<any[]>([]);

const onUseFunc = (func: any) => {
    console.log(func);
    selectList.value.push(func);
}

let drag = ref(false);
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
            padding: 16px;
            width: calc(50% - 5px);
            border-radius: 6px;
            background-color: var(--contentBackground);
            .flowContent {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                .flowTitle {
                    font-size: 16px;
                    color: var(--regularText);
                }
                .flowDesc {
                    margin-bottom: 16px;
                    color: var(--secondaryText);
                }
                .flowList {
                    flex: 1 0 auto;
                    height: 0;
                    overflow-y: auto;
                    .flowItem {
                        width: 100%;
                        padding: 10px 20px;
                        margin-bottom: 10px;
                        font-size: 14px;
                        color: var(--regularText);
                        border-radius: 4px;
                        border: 1px solid var(--placeholderText);
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
