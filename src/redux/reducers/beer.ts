import { Action, Beer, Maybe } from 'src/models';
import * as actionType from '../constants';

export interface IBeerState {
  isLoading: boolean;
  error: Maybe<string>;
  beers: Array<Beer>;
}

const initialState: IBeerState = {
  isLoading: false,
  error: null,
  beers: [],
};

export default function beerReducer(
  state: IBeerState = initialState,
  action: Action
): IBeerState {
  const { type, payload } = action;

  switch (type) {
    case actionType.GET_BEER_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionType.GET_BEER_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        beers: payload,
      };
    case actionType.GET_BEER_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
