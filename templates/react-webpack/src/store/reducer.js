import { combineReducers } from "redux";
import components from "@features/components/data/components.reducer";

const rootReducer = combineReducers({
  components,
});

export default rootReducer;
