/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { API_ENDPOINT } from 'src/utils';

import * as actions from '../actions';
import * as actionType from '../constants';

function* getBeerListRequest({
  payload,
}: ReturnType<typeof actions.getBeerListRequest>) {
  try {
    const res: AxiosResponse = yield call(axios.request, {
      url: `${API_ENDPOINT}?page=${payload.page}&per_page=${payload.perPage}`,
      method: 'GET',
    });

    yield put(actions.getBeerListSuccess(res.data));
  } catch {
    yield put(
      actions.getBeerlistFailure('Something is wrong. Please try again!')
    );
  }
}

export default function* beerSaga() {
  yield takeLatest(actionType.GET_BEER_LIST_REQUEST, getBeerListRequest);
}
