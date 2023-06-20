import path from 'path';

const isDev = process.env.NODE_ENV === 'development';

export function getResourcePath(subPath?: string): string {
    const dir = isDev ? path.join(process.cwd(), 'resources') : process.resourcesPath;
    return subPath ? path.join(dir, subPath) : dir;
}