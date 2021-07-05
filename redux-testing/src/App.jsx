import { useEffect, useState } from "react";
import { connect } from "react-redux";

import TodoItem from "./components/TodoItem";
import { addTodo, fetchTodos } from "./redux/actions";

const sortTodos = todos => todos.sort((a,b)=>{
  if(a.completed && !b.completed) return 1
  if(!a.completed && b.completed) return -1
  return 0
})

const App = ({loading,todos,addTodo,fetchTodos}) => {
  const [inputValue, setInputValue] = useState("");

  const onAdd = () => {
    if(inputValue !== ""){
      addTodo(inputValue)
      setInputValue("")
    }
  }

  useEffect(() => {
    fetchTodos()
  },[fetchTodos])


  return (
    <div className="container mx-auto mt-10">
      <div className="bg-gray-100 rounded-xl p-8 w-1/2 mx-auto">
        <h2 className="text-3xl p-2">Todo list</h2>

        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input"
          type="text"
        />

        <button className="btn" onClick={onAdd}>
          Add task
        </button>

        <hr className="py-2 my-2" />

        {loading ? "loading.." : todos?.length > 0 && sortTodos(todos).map((t) => (
          <TodoItem key={t.id} data={t} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({todos,loading}) => {
  return {todos,loading}
}

const mapDispatchToProps = {
  addTodo,fetchTodos
}

export default connect(mapStateToProps, mapDispatchToProps)(App)