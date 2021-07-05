const initState = {
  loading: false,
  todos: [],
};

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case "TODOS_FETCHED":
      return {
        ...state,
        todos: [...state.todos, ...action.data.todos],
        loading: false,
      };

    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Math.max(...state.todos.map((i) => i.id)) + 1,
            title: action.data.title,
            completed: false,
          },
        ],
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item.id === action.data.id) {
            return {
              ...item,
              completed: !item.completed,
            };
          }
          return item;
        }),
      };

    case "SHOW_LOADING":
      return {
        ...state,
        loading: true,
      };

    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((i) => action.data.id !== i.id),
      };

    default:
      return state;
  }
};

export default todoReducer;
