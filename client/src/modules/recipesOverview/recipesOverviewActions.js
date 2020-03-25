import axios from 'axios';

export const FETCH_RECIPES = 'recipes/fetch-recipes';

export const fetchRecipes = (dispatch) => {
    axios.get('recipes').then(res => {
        return dispatch({
            type: FETCH_RECIPES,
            recipes: []
        });
    });
};