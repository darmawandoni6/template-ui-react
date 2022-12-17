import homeType from './home.type';

const initialState = {
  loading: false,
  data: null,
};

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case homeType.LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case homeType.HOME:
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
