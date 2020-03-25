import {FETCH_RECIPES} from "./recipesOverviewActions";

const initState = {
    recipes: []
};

const recipesOverviewReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_RECIPES:
            return {
                ...state,
                recipes: action.recipes,
            };
        default:
            return state;
    }
};

export default recipesOverviewReducer;