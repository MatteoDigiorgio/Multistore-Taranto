export const UPDATE_INPUT_VALUE = "UPDATE_INPUT_VALUE";
export const CLEAR_INPUT_VALUE = "CLEAR_INPUT_VALUE";
export const ADMIN_UPDATE_INPUT_VALUE = "UPDATE_INPUT_VALUE";
export const ADMIN_CLEAR_INPUT_VALUE = "CLEAR_INPUT_VALUE";

export const updateInputValue = (value: any) => {
  return {
    type: UPDATE_INPUT_VALUE,
    payload: value,
  };
};

export const clearInputValue = () => {
  return {
    type: CLEAR_INPUT_VALUE,
  };
};

export const adminupdateInputValue = (value: any) => {
  return {
    type: ADMIN_UPDATE_INPUT_VALUE,
    payload: value,
  };
};

export const adminclearInputValue = () => {
  return {
    type: ADMIN_CLEAR_INPUT_VALUE,
  };
};
