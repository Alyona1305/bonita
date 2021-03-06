const types = {
  PAUSE: 'PAUSE',
  PLAY: 'PLAY',
  SET_PLAYER_STATE: 'SET_PLAYER_STATE',
  PREVIOUS_TRACK: 'PREVIOUS_TRACK',
  NEXT_TRACK: 'NEXT_TRACK',
  CHANGE_TIME: 'CHANGE_TIME',
  SET_DURATION: 'SET_DURATION',
};

export const actionPause = (payload) => ({type: types.PAUSE, payload});
export const actionPlay = (payload) => ({type: types.PLAY, payload});
export const actionSetPlayerState = (payload) => ({type: types.SET_PLAYER_STATE, payload});

export const actionPreviousTrack = (payload) => ({type: types.PREVIOUS_TRACK, payload});
export const actionNextTrack = (payload) => ({type: types.NEXT_TRACK, payload});

export const actionChangeTime = (payload) => ({type: types.CHANGE_TIME, payload});
export const actionSetDuration = (payload) => ({type: types.SET_DURATION, payload});

export default types;
