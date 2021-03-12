import { Action, Beer, IGetBeerPayload } from 'src/models';
import * as actionType from '../constants';

export const getBeerListRequest = (payload: IGetBeerPayload): Action => ({
  type: actionType.GET_BEER_LIST_REQUEST,
  payload,
});

export const getBeerListSuccess = (payload: Array<Beer>): Action => ({
  type: actionType.GET_BEER_LIST_SUCCESS,
  payload,
});

export const getBeerlistFailure = (payload: string): Action => ({
  type: actionType.GET_BEER_LIST_FAILURE,
  payload,
});
