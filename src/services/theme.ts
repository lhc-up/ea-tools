import { isFunction } from 'lodash';
import { Theme } from '../constants/theme';
import { localStorageService } from './storage';
import BrowserStorageItem from '../constants/storage';

interface CSSFile {
    use: () => void;
    unuse: () => void;
}

interface Themes {
    [theme: string]: CSSFile[];
}

export class ThemeService {
    readonly themes: Themes = {};

    registerTheme(theme: Theme, cssFiles: any) {
        this.themes[theme] = cssFiles;
    }

    applyTheme(newTheme: Theme) {
        Object.values(this.themes).forEach((theme: CSSFile[]) => {
            theme.forEach((cssFile: CSSFile) => {
                isFunction(cssFile?.unuse) && cssFile.unuse();
            });
        });
        this.themes[newTheme].forEach((cssFile: CSSFile) => {
            isFunction(cssFile?.use) && cssFile.use();
        });
        localStorageService.set(BrowserStorageItem.theme, newTheme);
    }

    static getTheme() {
        return localStorageService.get(BrowserStorageItem.theme);
    }
}

export const themeService = new ThemeService();