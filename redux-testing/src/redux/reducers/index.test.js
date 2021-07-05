import faker from "faker";

import reducer from ".";
import { createRandomTodos } from "../../helpers/test";

const initState = {
  loading: false,
  todos: [],
};

describe("Reducers", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it("should handle SHOW_LOADING", () => {
    const type = "SHOW_LOADING";

    const action = { type };

    const reducerReturnValue = reducer(initState, action);

    expect(reducerReturnValue.loading).toEqual(true);
  });

  it("should handle TODOS_FETCHED", () => {
    const type = "TODOS_FETCHED";
    const initState = {
      loading: true,
      todos: [],
    };

    // create random todos
    const randomTodos = createRandomTodos();

    const actionData = {
      todos: randomTodos,
    };

    const action = {
      type,
      data: actionData,
    };

    const reducerReturnValue = reducer(initState, action);

    expect(reducerReturnValue.todos).toEqual(randomTodos);
    expect(reducerReturnValue.loading).toEqual(false);
  });

  it("should handle ADD_TODO", () => {
    const type = "ADD_TODO";

    // create random todos
    const randomTodos = createRandomTodos();

    const initState = {
      loading: false,
      todos: randomTodos,
    };

    const actionData = {
      title: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
    };

    const action = {
      type,
      data: actionData,
    };

    const reducerReturnValue = reducer(initState, action);
    const isTodoAdded = reducerReturnValue.todos.some(
      (t) => t.title === actionData.title
    );

    expect(isTodoAdded).toBe(true);
  });

  it("should handle TOGGLE_TODO", () => {
    const type = "TOGGLE_TODO";

    // create random todos
    const randomTodos = createRandomTodos();
    const randomTodoId =
      randomTodos[faker.datatype.number(randomTodos.length)].id;
    const randomTodo = randomTodos.find((t) => t.id === randomTodoId);

    const initState = {
      todos: randomTodos,
    };

    const actionData = {
      id: randomTodoId,
    };

    const action = {
      type,
      data: actionData,
    };

    const reducerReturnValue = reducer(initState, action);
    const toggledTodo = reducerReturnValue.todos.find(
      (t) => t.id === randomTodoId
    );

    expect(toggledTodo.completed).toBe(!randomTodo.completed);
  });

  it("should handle REMOVE_TODO", () => {
    const type = "REMOVE_TODO";

    // create random todos
    const randomTodos = createRandomTodos();
    const randomTodoId =
      randomTodos[faker.datatype.number(randomTodos.length)].id;

    const initState = {
      todos: randomTodos,
    };

    const actionData = {
      id: randomTodoId,
    };

    const action = {
      type,
      data: actionData,
    };

    const reducerReturnValue = reducer(initState, action);
    const toggledTodo = reducerReturnValue.todos.some(
      (t) => t.id === randomTodoId
    );

    expect(toggledTodo).toBe(false);
  });
});
