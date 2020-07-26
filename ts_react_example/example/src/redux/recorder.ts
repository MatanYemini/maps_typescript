import { Action } from 'redux';
import { RootState } from './store';

// Defining the state for the reducer
interface RecorderState {
  dateStart: string;
}

// Defining the actions options
enum RecorderActions {
  START = 'recoder/start',
  STOP = 'recorder/stop',
}

// Defining action types
type StartAction = Action<RecorderActions.START>;
type StopAction = Action<RecorderActions.STOP>;

// The action creators
export const start = (): StartAction => ({
  type: RecorderActions.START,
});
export const stop = (): StopAction => ({
  type: RecorderActions.STOP,
});

// Define initial state object
const initialState: RecorderState = {
  dateStart: '',
};

// Creating the selectors
export const selectRecorderState = (rootState: RootState) => rootState.recorder;
export const selectDateStart = (rootState: RootState) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  return selectRecorderState(rootState).dateStart;
};

const recorderReducer = (
  state: RecorderState = initialState,
  action: StartAction | StopAction
) => {
  switch (action.type) {
    case RecorderActions.START:
      return { ...state, dateStart: new Date().toISOString() };
    case RecorderActions.STOP:
      return { ...state, dateStart: '' };
    default:
      return state;
  }
};

export default recorderReducer;
