import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import axios from "axios";
import { todosFetched, showLoading } from "../actions";

export const routes = {
  GET_TODOS: "https://jsonplaceholder.typicode.com/todos",
};

function* fetchData() {
  yield takeEvery("FETCH_TODOS", makeFetchTodosRequest);
}

function* makeFetchTodosRequest() {
  try {
    // dispatch loading action
    yield put(showLoading());
    // call api
    const { data } = yield call(axios.get, routes.GET_TODOS);
    // return only first 5 todos from response
    const todos = data.slice(0, 5);
    // dispatch todos action
    yield put(todosFetched(todos));
  } catch (error) {
    console.error(error);
  }
}

export { makeFetchTodosRequest };

export default function* todosSaga() {
  yield all([fork(fetchData)]);
}
