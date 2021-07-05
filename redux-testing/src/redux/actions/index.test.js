import {
  addTodo,
  fetchTodos,
  removeTodo,
  showLoading,
  todosFetched,
  toggleTodo,
} from ".";
import faker from "faker";
import { createRandomTodos } from "../../helpers/test";

describe("Actions", () => {
  it("should test addTodo action", () => {
    const title = faker.lorem.sentence();
    const actionReturnValue = addTodo(title);

    expect(actionReturnValue.type).toEqual("ADD_TODO");
    expect(actionReturnValue.data.title).toEqual(title);
  });

  it("should test toggleTodo action", () => {
    const id = faker.datatype.number();
    const actionReturnValue = toggleTodo(id);

    expect(actionReturnValue.type).toEqual("TOGGLE_TODO");
    expect(actionReturnValue.data.id).toEqual(id);
  });

  it("should test removeTodo action", () => {
    const id = faker.datatype.number();
    const actionReturnValue = removeTodo(id);

    expect(actionReturnValue.type).toEqual("REMOVE_TODO");
    expect(actionReturnValue.data.id).toEqual(id);
  });

  it("should test fetchTodos action", () => {
    const actionReturnValue = fetchTodos();

    expect(actionReturnValue.type).toEqual("FETCH_TODOS");
  });

  it("should test todosFetched action", () => {
    const todos = createRandomTodos();

    const actionReturnValue = todosFetched(todos);

    expect(actionReturnValue.type).toEqual("TODOS_FETCHED");
    expect(actionReturnValue.data.todos).toEqual(todos);
  });

  it("should test showLoading action", () => {
    const actionReturnValue = showLoading();

    expect(actionReturnValue.type).toEqual("SHOW_LOADING");
  });
});
