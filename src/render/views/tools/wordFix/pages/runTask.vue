<template>
    <div class="runTask">
        <div class="fileList" v-for="(file, index) in toolList.files" :key="index">
            <p>{{ file.name }}</p>    
            <p>{{ file.description }}</p>
            <p>{{ file.meta.path }}</p>
        </div>
        <div v-for="(func, index) in toolList.docs" class="funcList">
            <p>{{ func.name }}</p>
            <p>{{ func.description }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import * as __base from '../libs/base';
import fs from 'fs';
import path from 'path';
import { onMounted } from 'vue';

const isDev = process.env.NODE_ENV === 'development';
// jsdoc文件夹地址
const dir = isDev 
    ? path.join(process.cwd(), 'src/render/views/tools/wordFix/libs/jsdoc') 
    : path.join(process.resourcesPath, 'jsdoc');

const funcList = ['base.pkg()'];

const base = {...__base}

const toolList = eval('require')(path.join(dir, 'js/tools.js'));
console.log(toolList);
const func = toolList.docs[0].longname;
console.log(1);
console.log(`${func}('你好')`);

eval(`${func}('你好')`);
// eval(`
//     const path = require('path');
//     const toolList = require(path.join('${dir}', 'js/tools.js'));
//     console.log('toolList', toolList)
// `);

</script>
<style lang="less" scoped></style>