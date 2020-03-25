import {combineReducers} from "redux";
import appReducer from "./modules/app/appReducer";
import recipesOverviewReducer from "./modules/recipesOverview/recipesOverviewReducer";

const reducers = combineReducers({
    appReducer,
    recipesOverviewReducer
});

export default reducers;