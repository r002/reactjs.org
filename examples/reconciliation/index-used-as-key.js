const ToDo = props => (
  <tr>
    <td>
      <label>{props.id}</label>
    </td>
    <td>
      <input />
    </td>
    <td>
      <label>{props.createdAt.toTimeString()}</label>
    </td>
  </tr>
);

function ToDoList() {
  const [todoCounter, setTodoCounter] = useState(1);
  const [list, setList] = useState([
    {
      id: todoCounter,
      createdAt: new Date()
    }
  ]);

  function sortByEarliest() {
    const sortedList = list.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });
    setList([...sortedList]);
  }

  function sortByLatest() {
    const sortedList = list.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    setList([...sortedList]);
  }

  function addToEnd() {
    const date = new Date();
    const nextId = todoCounter + 1;
    const newList = [
      ...list,
      { id: nextId, createdAt: date },
    ];
    setList(newList);
    setTodoCounter(nextId);
  }

  function addToStart() {
    const date = new Date();
    const nextId = todoCounter + 1;
    const newList = [
      { id: nextId, createdAt: date },
      ...list,
    ];
    setList(newList);
    setTodoCounter(nextId);
  }

  return (
    <div>
      <code>key=index</code>
      <br />
      <button onClick={addToStart}>
        Add New to Start
      </button>
      <button onClick={addToEnd}>
        Add New to End
      </button>
      <button onClick={sortByEarliest}>
        Sort by Earliest
      </button>
      <button onClick={sortByLatest}>
        Sort by Latest
      </button>
      <table>
        <tr>
          <th>ID</th>
          <th />
          <th>created at</th>
        </tr>
        {list.map((todo, index) => (
          <ToDo key={index} {...todo} />
        ))}
      </table>
    </div>
  );
}

ReactDOM.render(
  <ToDoList />,
  document.getElementById('root')
);
