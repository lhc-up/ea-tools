<template>
    <div class="toolContent">
        <div class="toolList">
            <div @click="viewPort" class="tool">
                <span class="text">查看端口占用</span>
                <div class="form">
                    <Button @click="search" type="primary">查询</Button>
                    <Input v-model="port" />
                </div>
            </div>
            <div @click="viewPort" class="tool">
                <span class="text">查看本机ip</span>
                <div class="form">
                    <Button @click="getIp" type="primary">查询</Button>
                    <span class="ip">{{ localIp }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button, Input, Message, Modal } from 'view-ui-plus';
import { getPortHolder } from './libs/port';
import { ref } from 'vue';
const ip = require('ip');
const viewPort = async () => {
    const info = await getPortHolder(5172);
    console.log(info);
};

// 要查询的端口
const port = ref<number>();
const search = async () => {
    if (!port.value) return Message.error('请输入端口号');
    if (port.value < 0 || port.value > 65535) return Message.error('请输入正确的端口号');
    try {
        const { pId, pName } = await getPortHolder(port.value);
        if (!pId) return Message.info(`端口${port.value}未被占用`);
        return Modal.info({
            title: '提示',
           content: `端口被占用，pId：${pId}，进程名称：${pName}` 
        });
    } catch {}
};

// 查询本机ip
const localIp = ref<string>();
const getIp = () => {
    localIp.value = ip.address();
}

// TODO rgb转十六进制
// TODO 自定义bash
</script>
<style lang="less" scoped>
.toolContent {
    .toolList {
        padding: 20px;
        display: grid;
        grid-template-columns: repeat(auto-fill, 200px);
        grid-column-gap: 10px;
        .tool {
            width: 200px;
            height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 20px;
            color: var(--regularText);
            border: 1px solid var(--borderColor);
            background-color: var(--contentBackground);
            border-radius: 5px;
            cursor: pointer;
            .text {
                margin-bottom: 10px;
                font-weight: bold;
                width: 100%;
            }
            .ivu-input-wrapper {
                width: 100px;
                margin-right: 10px;
            }
        }
    }
}
</style>
