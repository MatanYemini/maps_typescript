import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';
import { selectDateStart } from './recorder';

export interface UserEvent {
  id: number;
  title: string;
  dateStart: string;
  dateEnd: string;
}

interface UserEventsState {
  byIds: Record<UserEvent['id'], UserEvent>;
  allIds: UserEvent['id'][];
}

const initialState: UserEventsState = {
  byIds: {},
  allIds: [],
};

enum UserEventsActions {
  LOAD_REQUESTS = 'userEvents/load_request',
  LOAD_SUCCESS = 'userEvents/load_success',
  LOAD_FAILURE = 'userEvents/load_failure',
  CREATE_REQUEST = 'userEvents/create_request',
  CREATE_SUCCESS = 'userEvents/create_success',
  CREATE_FAILURE = 'userEvents/create_failure',
  DELETE_REQUEST = 'userEvents/delete_request',
  DELETE_SUCCESS = 'userEvents/delete_success',
  DELETE_FAILURE = 'userEvents/delete_failure',
}

// Our actions
interface LoadRequestAction extends Action<UserEventsActions.LOAD_REQUESTS> {}
interface LoadSuccessAction extends Action<UserEventsActions.LOAD_SUCCESS> {
  payload: {
    events: UserEvent[];
  };
}
interface LoadFailureAction extends Action<UserEventsActions.LOAD_FAILURE> {
  error: string;
}
interface CreateRequestAction
  extends Action<typeof UserEventsActions.CREATE_REQUEST> {}
interface CreateSuccessAction
  extends Action<typeof UserEventsActions.CREATE_SUCCESS> {
  payload: {
    event: UserEvent;
  };
}
interface CreateFailureAction
  extends Action<typeof UserEventsActions.CREATE_FAILURE> {}
interface DeleteRequestAction
  extends Action<typeof UserEventsActions.DELETE_REQUEST> {}
interface DeleteSuccessAction
  extends Action<typeof UserEventsActions.DELETE_SUCCESS> {
  payload: { id: UserEvent['id'] };
}
interface DeleteFailureAction
  extends Action<typeof UserEventsActions.DELETE_FAILURE> {}

// async to load the events
export const loadUserEvents = (): ThunkAction<
  void,
  RootState,
  undefined,
  LoadRequestAction | LoadSuccessAction | LoadFailureAction
> => async (dispatch, getState) => {
  dispatch({
    type: UserEventsActions.LOAD_REQUESTS,
  });

  try {
    const response = await fetch('http://localhost:3001/events');
    const events: UserEvent[] = await response.json();

    dispatch({
      type: UserEventsActions.LOAD_SUCCESS,
      payload: { events },
    });
  } catch (e) {
    dispatch({
      type: UserEventsActions.LOAD_FAILURE,
      error: 'Failed to load events',
    });
  }
};

export const createUserEvent = (): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  CreateRequestAction | CreateSuccessAction | CreateFailureAction
> => async (dispatch, getState) => {
  dispatch({
    type: UserEventsActions.CREATE_REQUEST,
  });

  try {
    const dateStart = selectDateStart(getState());

    const event: Omit<UserEvent, 'id'> = {
      title: 'no name',
      dateStart,
      dateEnd: new Date().toISOString(),
    };

    const response = await fetch(`http://localhost:3001/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    const createdEvent: UserEvent = await response.json();
    dispatch({
      type: UserEventsActions.CREATE_SUCCESS,
      payload: { event: createdEvent },
    });
  } catch (e) {
    dispatch({
      type: UserEventsActions.CREATE_FAILURE,
    });
  }
};

export const deleteUserEvent = (
  id: UserEvent['id']
): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  DeleteRequestAction | DeleteSuccessAction | DeleteFailureAction
> => async (dispatch) => {
  dispatch({
    type: UserEventsActions.DELETE_REQUEST,
  });

  try {
    const response = await fetch(`http://localhost:3001/events/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch({
        type: UserEventsActions.DELETE_SUCCESS,
        payload: { id },
      });
    }
  } catch (e) {
    dispatch({
      type: UserEventsActions.DELETE_FAILURE,
    });
  }
};

// Our selectors - use it in order to turn the state structure to a shape that we will finally render
const selectUserEventsState = (rootState: RootState) => rootState.userEvents;

export const selectUserEventsArray = (rootState: RootState) => {
  const state = selectUserEventsState(rootState);
  return state.allIds.map((id) => state.byIds[id]);
};

const userEventsReducer = (
  state: UserEventsState = initialState,
  action: LoadSuccessAction | CreateSuccessAction | DeleteSuccessAction
) => {
  switch (action.type) {
    case UserEventsActions.LOAD_SUCCESS:
      const { events } = action.payload;
      return {
        ...state,
        allIds: events.map(({ id }) => id),
        byIds: events.reduce<UserEventsState['byIds']>((byIds, event) => {
          byIds[event.id] = event;
          return byIds;
        }, {}),
      };

    case UserEventsActions.CREATE_SUCCESS:
      const { event } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, event.id],
        byIds: { ...state.byIds, [event.id]: event },
      };

    case UserEventsActions.DELETE_SUCCESS:
      const { id } = action.payload;
      const newState = {
        ...state,
        byIds: { ...state.byIds },
        allIds: state.allIds.filter((storedId) => id !== storedId),
      };
      delete newState.byIds[id];
      return newState;

    default:
      return state;
  }
};

export default userEventsReducer;
