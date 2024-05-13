import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import TodoApp from "./components/App";

function App() {
  return (
    <div className="App">
      <h1 className="title">Todos</h1>
      <TodoApp />
    </div>
  );
}

export default App;
