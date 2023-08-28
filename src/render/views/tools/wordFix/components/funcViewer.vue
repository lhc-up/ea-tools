<template>
    <div class="funcViewer">
        <div v-for="moduleItem in list" :key="moduleItem.type" class="moduleItem">
            <p class="moduleTitle">{{ moduleItem.type }}</p>
            <div class="funcList">
                <div v-for="func in moduleItem.list" :key="func.longname" :class="['funcItem', { expand: currentExpand === func.longname }]" @click="toogleExpand(func.longname)">
                    <div class="funcName">
                        {{ func.longname }}
                        <div @click.stop="use(func)" class="use">使用</div>
                    </div>
                    <template v-if="currentExpand === func.longname">
                        <p class="funcDescription">{{ func.description }}</p>
                        <div class="funcContent">
                            <p class="subTitle">参数：{{ getParamsDesc(func.params) }}</p>
                            <p class="subTitle">返回值：{{ getRetDesc(func.returens) }}</p>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
    list: any[]
}>();
console.log(props.list);
const getParamsDesc = (paramsList: any[] = []) => {
    return paramsList.map((v, i) => {
        return `${i+1}、${v.name} ${v.type} ${v.description}`
    }).join('；');
}
const getRetDesc = (returnList: any[] = []) => {
    return returnList[0]?.description || '无';
}

let currentExpand = ref('');
const toogleExpand = (longname: string) => {
    if (currentExpand.value == longname) {
        currentExpand.value = '';
    } else {
        currentExpand.value = longname;
    }
}

const emitUse = defineEmits<{
    (e: 'on-use', func: any): void
}>();
const use = (func: any) => {
    emitUse('on-use', func);
}
</script>
<style lang="less" scoped>
.funcViewer {
    .moduleItem {
        padding-bottom: 16px;
        border-bottom: 1px solid var(--secondaryText);
        .moduleTitle {
            color: var(--primaryText);
            font-weight: bold;
            font-size: 16px;
        }
        .funcList {
            .funcItem {
                padding-left: 16px;
                color: var(--secondaryText);
                .funcName {
                    position: relative;
                    height: 30px;
                    line-height: 30px;
                    color: var(--primaryText);
                    font-weight: bold;
                    cursor: pointer;
                    .use {
                        position: absolute;
                        top: 0;
                        right: 0;
                        color: var(--regularText);
                    }
                }
                .funcDescription {
                    
                    
                }
                .funcContent {

                }
            }
        }
    }
}
</style>
