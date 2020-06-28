import Type from './types';
const initialState = {
  userImg: null,
  userName: null,
  dates: [],
  temps: [],
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.SET_USER_IMAGE:
      return {...state, userImg: action.payload};
    default:
      return state;
  }
};

export const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case Type.SET_DATES:
      return {...state, dates: action.payload};
    case Type.SET_TEMPS:
      return {...state, temps: action.payload};
    default:
      return state;
  }
};
