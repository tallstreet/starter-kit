import expect from 'expect';
import * as actions from '../BackendActions';
import * as types from '../../constants/ActionTypes';

describe('actions', () => {
  it('should create an action to post', () => {
    const expectedAction = {
      types: [types.POST_REQUEST, types.POST_SUCCESS, types.POST_FAILURE],
      amount: 12,
      account: '12'
    };
    const action = actions.post({}, 12, '12');
    expect(action.types).toEqual(expectedAction.types);
    expect(action.amount).toEqual(expectedAction.amount);
    expect(action.account).toEqual(expectedAction.amount);
  });
});
