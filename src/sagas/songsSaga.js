import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongRequest,
  addSongSuccess,
  addSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} from "../reducers/songsSlice";

function* fetchSongsSaga() {
  try {
    // Replace the API call with a dummy Ethiopian songs list
    const data = [
      {
        id: 1,
        title: "Tizita",
        artist: "Muluken Melesse",
        album: "Ethiopian Classics",
        year: 1970,
      },
      {
        id: 2,
        title: "Yene Habesha",
        artist: "Teddy Afro",
        album: "Tikur Sew",
        year: 2012,
      },
      {
        id: 3,
        title: "Abebayehosh",
        artist: "Aster Aweke",
        album: "Kabu",
        year: 1991,
      },
    ];
    yield put(fetchSongsSuccess(data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* addSongSaga(action) {
  try {
    const response = yield call(
      fetch,
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action.payload),
      }
    );
    const data = yield response.json();
    yield put(addSongSuccess(data));
  } catch (error) {
    yield put(addSongFailure(error.message));
  }
}

function* updateSongSaga(action) {
  try {
    const response = yield call(
      fetch,
      `https://jsonplaceholder.typicode.com/posts/${action.payload.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action.payload),
      }
    );
    const data = yield response.json();
    yield put(updateSongSuccess(data));
  } catch (error) {
    yield put(updateSongFailure(error.message));
  }
}

function* deleteSongSaga(action) {
  try {
    yield call(
      fetch,
      `https://jsonplaceholder.typicode.com/posts/${action.payload}`,
      {
        method: "DELETE",
      }
    );
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(deleteSongFailure(error.message));
  }
}

export default function* songsSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongsSaga);
  yield takeLatest(addSongRequest.type, addSongSaga);
  yield takeLatest(updateSongRequest.type, updateSongSaga);
  yield takeLatest(deleteSongRequest.type, deleteSongSaga);
}
