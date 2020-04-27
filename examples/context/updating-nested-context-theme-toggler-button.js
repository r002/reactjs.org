import { ThemeContext, ToggleThemeContext } from './theme-context';

function ThemeTogglerButton() {
  // highlight-range{1-2,4}
  // The Theme Toggler Button receives not only the theme
  // but also a toggleTheme function from contexts
  const theme = useContext(ThemeContext)
  const toggleTheme = useContext(ToggleThemeContext)

  return (
    <button
      onClick={toggleTheme}
      style={{ backgroundColor: theme.background }}>
      Toggle Theme
    </button>
  )
}

export default ThemeTogglerButton;
