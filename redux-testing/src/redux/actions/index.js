export const addTodo = (title) => ({
  type: "ADD_TODO",
  data: { title },
});

export const toggleTodo = (id) => ({
  type: "TOGGLE_TODO",
  data: { id },
});

export const removeTodo = (id) => ({
  type: "REMOVE_TODO",
  data: { id },
});

export const fetchTodos = () => ({
  type: "FETCH_TODOS",
});

export const todosFetched = (todos) => ({
  type: "TODOS_FETCHED",
  data: { todos },
});

export const showLoading = () => ({
  type: "SHOW_LOADING",
});
