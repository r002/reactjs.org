import { ThemeContext, ToggleThemeContext, themes } from './theme-context';
import ThemeTogglerButton from './theme-toggler-button';

function App() {
  [theme, setTheme] = useState(themes.light)

  function toggleTheme() {
    setTheme(currentTheme => {
      return currentTheme === themes.dark
        ? themes.light
        : themes.dark
    })
  }

  // highlight-range{1-3,6}
  // The toggleTheme function is provided via
  // the ToggleThemeContext so it will be passed 
  // down as well
  return (
    <ThemeContext.Provider value={theme}>
      <ToggleThemeContext.Provider value={toggleTheme}>
        <Content />
      </ToggleThemeContext.Provider >
    </ThemeContext.Provider >
  )
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

ReactDOM.render(<App />, document.root);
