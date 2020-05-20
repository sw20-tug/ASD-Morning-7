import {
    FETCH_RECIPES,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAILURE,
    SHOW_ONLY_FAVOURITES,
    SHOW_ALL,
    ADD_RECIPE,
    ADD_RECIPE_SUCCESS,
    ADD_RECIPE_FAILURE,
    EDIT_RECIPE_NAME,
    EDIT_RECIPE_NAME_SUCCESS,
    EDIT_RECIPE_NAME_FAILURE,
    UPDATE_RECIPE,
    UPDATE_RECIPE_SUCCESS, UPDATE_RECIPE_FAILURE
} from "./recipesActions";

const initState = {
    recipes: [],
    fetchRecipesLoading: false,
    fetchRecipesSuccess: false,
    fetchRecipesFailure: false,
    showOnlyFavourites: false,

    addRecipeLoading: false,
    addRecipeSuccess: false,
    addRecipeFailure: false
};

const recipesReducer = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_RECIPE:
            return {...state};
        case UPDATE_RECIPE_SUCCESS:
            const recipesClone = [...state.recipes];
            recipesClone.map((recipe, index) => {
                if (recipe.hasOwnProperty('id') && recipe.id === action.recipe.id) {
                    recipesClone[index] = action.recipe;
                }
            });
            return {
                ...state,
                recipes: recipesClone
            };
        case UPDATE_RECIPE_FAILURE:
            return {...state};
        case EDIT_RECIPE_NAME:
            return {...state};
        case EDIT_RECIPE_NAME_SUCCESS:
            return {...state};
        case EDIT_RECIPE_NAME_FAILURE:
            return {...state};
        case ADD_RECIPE:
            return {
                ...state,
                addRecipeLoading: true,
                addRecipeSuccess: false,
                addRecipeFailure: false
            };
        case ADD_RECIPE_SUCCESS:
            return {
                ...state,
                addRecipeLoading: false,
                addRecipeSuccess: true,
                addRecipeFailure: false,
                recipes: [action.recipe, ...state.recipes]
            };
        case ADD_RECIPE_FAILURE:
            return {
                ...state,
                addRecipeLoading: false,
                addRecipeSuccess: false,
                addRecipeFailure: true
            };
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
                // dont change recipes in store
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

export default recipesReducer;