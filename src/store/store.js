import {
  combineReducers, createStore, applyMiddleware, compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { playerReducer } from './reducers/playerReducer';
import { tracksSaga } from './sagas/tracksSaga';
import { tracksReducer } from './reducers/tracksReducer';
import { playerSaga } from './sagas/playerSaga';
import { authReducer } from './reducers/authReducer';
import { authSaga } from './sagas/authSaga';
import { playlistsReducer } from './reducers/playlistsReducer';
import { playlistsSaga } from './sagas/playlistsSaga';
import { uploadSaga } from './sagas/uploadSaga';
import { uploadReducer } from './reducers/uploadReducer';
import { loadState, saveState, stateToStorageSelector } from '../utils/localStorage';
import { snackBarReducer } from './reducers/snackBarReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  player: playerReducer,
  tracks: tracksReducer,
  auth: authReducer,
  playlists: playlistsReducer,
  upload: uploadReducer,
  snackBar: snackBarReducer,
});

function* rootSaga() {
  yield all([
    tracksSaga(),
    playerSaga(),
    authSaga(),
    playlistsSaga(),
    uploadSaga(),
  ]);
}

const middleware = [
  applyMiddleware(sagaMiddleware),
  ...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : []),
];

const store = createStore(
  rootReducer,
  loadState(),
  compose(...middleware),
);

store.subscribe(() => {
  saveState(stateToStorageSelector(store.getState()));
});

sagaMiddleware.run(rootSaga);

export default store;
