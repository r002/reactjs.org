function Timer() {
  const [seconds, setSeconds] = React.useState(0);

  function tick() {
    setSeconds(oldSeconds => oldSeconds + 1);
  }

  useEffect(() => {
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [])

  return (
    <div>
      Seconds: {seconds}
    </div>
  );
}

ReactDOM.render(
  <Timer />,
  document.getElementById('timer-example')
);