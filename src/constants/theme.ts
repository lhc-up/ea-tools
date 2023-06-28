export enum Theme {
    Dark = 'DARK',
    Light = 'LIGHT'
}

interface ThemeItem {
    inputDisplay: string;
    value: Theme;
}
export const THEMES: ThemeItem[] = [
    {
        inputDisplay: 'Dark Theme',
        value: Theme.Dark,
    },
    {
        inputDisplay: 'Light Theme',
        value: Theme.Light,
    }
]
  
export default THEMES;