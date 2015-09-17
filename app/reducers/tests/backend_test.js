import expect from 'expect';
import reducer from '../backend';
import * as types from '../../constants/ActionTypes';

describe('backend reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({});
  });

  it('should handle POST_REQUEST', () => {
    expect(
      reducer([], {
        type: types.POST_REQUEST,
        amount: 12,
        account: '12'
      })
    ).toEqual({
      amount: 12,
      account: '12',
      loading: true
    });
  });
});
