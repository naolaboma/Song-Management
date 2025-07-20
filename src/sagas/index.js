import { all } from "redux-saga/effects";
import songsSaga from "./songsSaga";

export default function* rootSaga() {
  yield all([songsSaga()]);
}
