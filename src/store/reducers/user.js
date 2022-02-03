const initialState = {
  userId: null,
  isLoggedIn: false,
  refreshState: 0,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
        return {...state, isLoggedIn: true};
    }

    case "LOGOUT": {
      return {
          ...state,
          isLoggedIn: false
      }
    }

    case "UPDATE_REFRESH": {
      return {
        ...state,
        refreshState: state.refreshState + 1
      }
    }
    default: {
      return state;
    }
  }
};
export default UserReducer;
