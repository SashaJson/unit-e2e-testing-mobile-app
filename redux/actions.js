import Type from './types';
export const setUserImage = imgUrl => ({
  type: Type.SET_USER_IMAGE,
  payload: imgUrl,
});

export const setDates = dates => ({
  type: Type.SET_DATES,
  payload: dates,
});

export const setTemps = temps => ({
  type: Type.SET_TEMPS,
  payload: temps,
});
