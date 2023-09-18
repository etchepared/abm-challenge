const initialState = {
  balance: null,
  tenMovements: [],
  allMovements: [],
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BALANCE":
      return {
        ...state,
        balance: action.payload,
      };

    case "SET_TEN":
      return {
        ...state,
        tenMovements: action.payload,
      };

    case "SET_ALL_MOVEMENTS":
      return {
        ...state,
        allMovements: action.payload,
      };

    default:
      return state;
  }
};
