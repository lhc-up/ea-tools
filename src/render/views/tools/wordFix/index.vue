<template>
    <div class="toolContent">
        <div class="topBar">报告共性问题修复</div>
        <div class="toolBar">
            <Button @click="addTask" type="primary" icon="md-add" size="large">创建任务</Button>
        </div>
        <div class="mainContent">
            <div class="taskList">
                <div class="th">
                    <div class="td">
                        <Checkbox v-model="value1"></Checkbox>
                    </div>
                    <div class="td">任务名称</div>
                    <div class="td">任务描述</div>
                    <div class="td">操作</div>
                </div>
                <div class="tBody">
                    <div class="tr">
                        <div class="td"><Checkbox v-model="value2"></Checkbox></div>
                        <div class="td">说明章节文字</div>
                        <div class="td">1、7月改为8月；2、县改为样本县...</div>
                        <div class="td btnList">
                            <div class="btn">执行</div>
                            <div class="btn">删除</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, toRaw, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { BrowserView, getCurrentWindow } from '@electron/remote';
const router = useRouter();
const value1 = ref(false);
const value2 = ref(false);

const addTask = () => {
    
    console.log(router);
    
    router.push({
        name: 'wordFix/addTask'
    });
}
onMounted(() => {
    // const win = getCurrentWindow();
    // const view = new BrowserView();
    // win.setBrowserView(view);
    // view.setBounds({ x: 60, y: 100, width: 300, height: 300});
    // view.setAutoResize({});
    // view.webContents.loadURL('https://electronjs.org');
});
</script>
<style lang="less" scoped>
.toolContent {
    padding: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .topBar {
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: bold;
        color: var(--regularText);
    }
    .toolBar {
        margin-bottom: 20px;
    }
    .mainContent {
        flex: 1;
        width: 100%;
        border-radius: 6px;
        background-color: var(--contentBackground);
        .taskList {
            .th, .tr {
                display: grid;
                grid-template-columns: 5% 30% 45% 20%;
                font-size: 16px;
                color: var(--primaryText);
                border-bottom: 1px solid var(--borderColor);
                .td {
                    height: 50px;
                    padding-left: 20px;
                    line-height: 50px;
                }
            }
            .th {
                font-size: 16px;
            }
            .tr {
                font-size: 14px;
                color: var(--secondaryText);
                .td.btnList {
                    display: flex;
                    align-items: center;
                    .btn {
                        margin-right: 20px;
                        color: var(--regularText);
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
