import componentsType from "./components.type";

const initialState = {
  loading: false,
  data: [],
};

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case componentsType.LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case componentsType.POST:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    default:
      return state;
  }
}

export default reducer;
