import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router/index';
import App from './App.vue';
import '@/render/libs/styles/public.less';
import { themeService } from '../services/theme';
import { Theme } from '../constants/theme';
import themeDark from '@/render/libs/styles/theme/darkTheme/theme.lazy.less';
import themeLight from '@/render/libs/styles/theme/darkTheme/theme.lazy.less';
import { toolService } from '../services/tool';
import { clientBuilder } from './views/tools/clientBuilder/entry';

// 主题色
themeService.registerTheme(Theme.Dark, [themeDark]);
themeService.registerTheme(Theme.Light, [themeLight]);
// TODO:定义主题色值，并在使用该色值
themeService.applyTheme(Theme.Dark);

// 工具
toolService.registerTool(clientBuilder);

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
console.log(router)

router.isReady().then(() => app.mount('#app'));