import { runSaga } from "redux-saga";
import axios from "axios";

import { makeFetchTodosRequest } from "./todos";
import { createRandomTodos } from "../../helpers/test";

jest.mock("axios");

describe("Sagas", () => {
  it("should test makeFetchTodosRequest saga", async () => {
    const randomTodos = createRandomTodos();

    axios.get.mockResolvedValue({ data: randomTodos });

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      makeFetchTodosRequest
    ).toPromise();

    expect(dispatched[0].type).toEqual("SHOW_LOADING");

    expect(dispatched[1].type).toEqual("TODOS_FETCHED");
    expect(dispatched[1].data.todos).toEqual(randomTodos);
  });
});
