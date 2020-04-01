import {combineReducers} from "redux";
import appReducer from "./modules/app/appReducer";
import recipesReducer from "./modules/recipes/recipesReducer";

const reducers = combineReducers({
    appReducer,
    recipesOverviewReducer: recipesReducer
});

export default reducers;