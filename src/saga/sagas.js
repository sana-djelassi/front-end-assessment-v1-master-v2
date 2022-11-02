import { all } from 'redux-saga/effects';
import Products from './products'
export default function* rootSaga(getState) {
    yield all([
    Products()
    ]);
  }