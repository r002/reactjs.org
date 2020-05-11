// You need to be able to pass down an update function as well.
// highlight-range{2}
export const ThemeContext = React.createContext(themes.dark);
export const ToggleThemeContext = React.createContext(() => { });
