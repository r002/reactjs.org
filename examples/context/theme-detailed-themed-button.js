import { ThemeContext } from './theme-context';

function ThemedButton(props) {
  // highlight-range{1}
  const theme = useContext(ThemeContext);

  return (
    <button
      {...props}
      style={{ backgroundColor: theme.background }}
    />
  );
}

export default ThemedButton;
