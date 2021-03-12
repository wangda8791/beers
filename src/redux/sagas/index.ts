/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, fork } from 'redux-saga/effects';

import beerSaga from './beer';

export default function* rootSaga() {
  yield all([fork(beerSaga)]);
}
