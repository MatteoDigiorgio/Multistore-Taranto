import { UPDATE_INPUT_VALUE, CLEAR_INPUT_VALUE } from "./actions";

const initialState = {
  inputValue: "",
};

const reducer = (state = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case UPDATE_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.payload,
      };
    case CLEAR_INPUT_VALUE:
      return {
        ...state,
        inputValue: "",
      };
    default:
      return state;
  }
};

export default reducer;
