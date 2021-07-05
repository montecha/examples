import faker from "faker";

export const createRandomTodos = () => {
  const todos = [];
  Array.from(Array(faker.datatype.number(32)).keys()).forEach((idx) => {
    todos.push({
      id: idx,
      title: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
    });
  });
  return todos;
};
