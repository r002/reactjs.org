function FileInput() {
  const fileInput = useRef(null);

  function handleSubmit(event) {
    // highlight-range{3}
    event.preventDefault();
    alert(
      `Selected file - ${fileInput.current.files[0].name}`
    );
  }

  // highlight-range{5}
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Upload file:
        <input type="file" ref={fileInput} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

ReactDOM.render(
  <FileInput />,
  document.getElementById('root')
);
