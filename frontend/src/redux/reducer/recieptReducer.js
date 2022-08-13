const stateDefault = {
  supplierSelected: null
};

export const RecieptReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "SELECT_SUPPLIER": {
      return { ...state, supplierSelected: action.payload.supplierSelected };
    }

    default:
      return { ...state };
  }
};
