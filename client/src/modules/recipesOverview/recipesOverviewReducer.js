import {
    FETCH_RECIPES,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAILURE, SHOW_ONLY_FAVOURITES, SHOW_ALL
} from "./recipesOverviewActions";

const initState = {
    recipes: [],
    fetchRecipesLoading: false,
    fetchRecipesSuccess: false,
    fetchRecipesFailure: false,
    showOnlyFavourites: false
};

const recipesOverviewReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_RECIPES:
            return {
                ...state,
                recipes: initState.recipes,
                fetchRecipesLoading: true,
                fetchRecipesSuccess: false,
                fetchRecipesFailure: false
            };
        case FETCH_RECIPES_SUCCESS:
            return {
                ...state,
                recipes: action.recipes,
                fetchRecipesLoading: false,
                fetchRecipesSuccess: true,
                fetchRecipesFailure: false
            };
        case FETCH_RECIPES_FAILURE:
            return {
                ...state,
                recipes: action.recipes,
                fetchRecipesLoading: false,
                fetchRecipesSuccess: false,
                fetchRecipesFailure: true
            };
        case SHOW_ONLY_FAVOURITES:
            return {
                ...state,
                showOnlyFavourites: true
            };
        case SHOW_ALL:
            return {
                ...state,
                showOnlyFavourites: false
            };
        default:
            return state;
    }
};

export default recipesOverviewReducer;