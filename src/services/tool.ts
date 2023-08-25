import { RouteRecordRaw } from 'vue-router';
import { Tool } from '../render/views/tools/tool';
import router from '../render/router';

export class ToolService {
    private readonly tools: Set<Tool> = new Set();

    registerTool(tool: Tool) {
        this.tools.add(tool);
        tool.routeList.forEach(route => {
            router.addRoute(route);
        });
    }

    /**
     * 获取所有工具的入口路由列表
     */
    get entryList(): RouteRecordRaw[] {
        return Array.from(this.tools).map(tool => {
            return tool.entry;
        });
    }

    get toolList(): Tool[] {
        return Array.from(this.tools);
    }
}

export const toolService = new ToolService();