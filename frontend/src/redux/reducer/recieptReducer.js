const stateDefault = {
  supplierSelected: null,
  selectedBook: null,
  receipForm: null,
};

export const RecieptReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "SELECT_SUPPLIER": {
      return {
        ...state,
        supplierSelected: action.payload.supplierSelected,
      };
    }
    case "SELECT_BOOK": {
      return { ...state, selectedBook: action.payload.bookSelected };
    }
    case "SUBMIT_RECEIPT": {
      return { ...state, receipForm: action.payload.receipt };
    }

    default:
      return { ...state };
  }
};
