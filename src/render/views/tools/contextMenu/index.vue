<template>
    <div class="toolContent">contextMenu</div>
</template>
<script setup lang="ts">
import { Menu, MenuItem, getCurrentWindow } from '@electron/remote';
console.log(Menu);
const menu = new Menu();
menu.append(
    new MenuItem({
        label: '新建txt文件',
        type: 'normal',
        click: function() {
            console.log(1);
            
        }
    })
)
menu.append(
    new MenuItem({
        label: '新建txt文件1',
        type: 'normal',
        click: function() {
            console.log(1);
            
        }
    })
)
menu.append(
    new MenuItem({
        label: '新建txt文件2',
        type: 'normal',
        click: function() {
            console.log(1);
            
        }
    })
)
window.addEventListener('contextmenu', e => {
    e.preventDefault();
    menu.popup({
        window: getCurrentWindow()
    });
});
</script>
<style lang="less" scoped></style>