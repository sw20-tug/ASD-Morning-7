import axios from 'axios';
import {hideAddRecipeDialog} from "../app/appActions";

export const FETCH_RECIPES = 'recipes/fetch-recipes';
export const FETCH_RECIPES_SUCCESS = 'recipes/fetch-recipes-success';
export const FETCH_RECIPES_FAILURE = 'recipes/fetch-recipes-failure';
export const SHOW_ONLY_FAVOURITES = 'recipes/fetch-recipes-show-only-favourites';
export const SHOW_ALL = 'recipes/fetch-recipes-show-all';

export const ADD_RECIPE = 'recipes/add-recipe';
export const ADD_RECIPE_SUCCESS = 'recipes/add-recipe-success';
export const ADD_RECIPE_FAILURE = 'recipes/add-recipe-failure';

export const EDIT_RECIPE_NAME = 'recipes/edit-recipe-name';
export const EDIT_RECIPE_NAME_SUCCESS = 'recipes/edit-recipe-name-success';
export const EDIT_RECIPE_NAME_FAILURE = 'recipes/edit-recipe-name-failure';

export const UPDATE_RECIPE = 'recipes/update-recipe';
export const UPDATE_RECIPE_SUCCESS = 'recipes/update-recipe-success';
export const UPDATE_RECIPE_FAILURE = 'recipes/update-recipe-failure';

export const editRecipeName = (dispatch, id, name) => {
    dispatch({type: EDIT_RECIPE_NAME});

    axios.put('recipes/' + id + '/rename', {name}).then(res => {
        dispatch({type: EDIT_RECIPE_NAME_SUCCESS, recipe: prepareRecipeForClient(res.data)});
    }).catch(err => {
        dispatch({type: EDIT_RECIPE_NAME_FAILURE});
        console.log('Could not edit recipe name.', err);
    });
};

export const fetchRecipes = (dispatch, onlyFavourites = false) => {

    dispatch({
        type: FETCH_RECIPES
    });

    axios.get('recipes').then(res => {
        let recipes = res.data.map(recipe => prepareRecipeForClient(recipe));

        // filter if only favourites should get displayed
        if (onlyFavourites) {
            recipes = recipes.filter(recipe => recipe.isFavorite)
        }

        return dispatch({
            type: FETCH_RECIPES_SUCCESS,
            recipes: recipes
        });

    }).catch(err => {
        dispatch({type: FETCH_RECIPES_FAILURE});
        console.log('Could not fetch ' + (onlyFavourites ? 'favourite recipes' : 'recipes'), err)
    });

};

export const fetchFavourites = (dispatch) => {
    fetchRecipes(dispatch, true)
};

export const showOnlyFavourites = (dispatch, enable) => {
    dispatch({
        type: enable ? SHOW_ONLY_FAVOURITES : SHOW_ALL
    });

    if (enable) {
        fetchFavourites(dispatch);
        return;
    }
    fetchRecipes(dispatch);
};

const prepareRecipeForServer = (recipe) => {
    if (!recipe.hasOwnProperty('ingredients')) {
        console.log("Cannot send a recipe without ingredients properties to the server", recipe);
        return;
    }

    recipe.ingredients = recipe.ingredients.join(';');
    return recipe;
};

const prepareRecipeForClient = (recipe) => {
    if (!recipe.hasOwnProperty('ingredients')) {
        console.log("Error: Recipe received from server has no ingredients", recipe);
        // TODO: fix this!
        recipe.ingredients = "cat;cat1;cat2";
        // return;
    }

    recipe.ingredients = recipe.ingredients.split(';');
    console.log(recipe.ingredients);
    return recipe;
};

export const addRecipe = (dispatch, recipe) => {

    dispatch({type: ADD_RECIPE});

    // add recipe after server responded
    // dispatch({type: ADD_RECIPE_SUCCESS, recipe});

    // number steps
    recipe.steps.map((step, index) => recipe.steps[index].number = index + 1);

    axios.post('recipes', prepareRecipeForServer(recipe)).then(res => {
        dispatch({type: ADD_RECIPE_SUCCESS, recipe: prepareRecipeForClient(res.data)});
        hideAddRecipeDialog(dispatch);
    }).catch(err => {
        dispatch({type: ADD_RECIPE_FAILURE});
        console.log('Could not add recipe', err);
    });
};

export const updateRecipe = (dispatch, recipe) => {
    dispatch({type: UPDATE_RECIPE});

    if (!recipe.hasOwnProperty('id')) {
        console.log('Could not update recipe: object has no id');
        return;
    }

    axios.put('recipes/' + recipe.id, prepareRecipeForServer(recipe)).then(res => {
        dispatch({type: UPDATE_RECIPE_SUCCESS, recipe: prepareRecipeForClient(res.data)});
        hideAddRecipeDialog(dispatch);
    }).catch(err => {
        dispatch({type: UPDATE_RECIPE_FAILURE});
        console.log('Could not edit recipe', err);
    });
};