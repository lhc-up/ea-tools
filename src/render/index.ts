import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router/index';
import App from './App.vue';
import ViewUI from 'view-ui-plus';
import '@/render/libs/styles/public.less';
import { themeService } from '../services/theme';
import { Theme } from '../constants/theme';
import themeDark from '@/render/libs/styles/theme/darkTheme/theme.lazy.less';
import themeLight from '@/render/libs/styles/theme/lightTheme/theme.lazy.less';
import { toolService } from '../services/tool';
import { clientBuilder } from './views/tools/clientBuilder/entry';
import { wordFix } from './views/tools/wordFix/entry';
import { contextMenu } from './views/tools/contextMenu/entry';
import { commonUse } from './views/tools/commonUse/entry';

// 主题色
themeService.registerTheme(Theme.Dark, [themeDark]);
themeService.registerTheme(Theme.Light, [themeLight]);
// TODO:定义主题色值，并在使用该色值
themeService.applyTheme(Theme.Light);

// 工具
// toolService.registerTool(clientBuilder);
// 报告修复
// toolService.registerTool(wordFix);
// 右键菜单
// toolService.registerTool(contextMenu);
// 常用工具
toolService.registerTool(commonUse);

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.use(ViewUI);

router.isReady().then(() => app.mount('#app'));