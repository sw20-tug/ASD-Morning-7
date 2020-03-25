import axios from 'axios';

export const FETCH_RECIPES = 'recipes/fetch-recipes';
export const FETCH_RECIPES_SUCCESS = 'recipes/fetch-recipes-success';
export const FETCH_RECIPES_FAILURE = 'recipes/fetch-recipes-failure';
export const SHOW_ONLY_FAVOURITES = 'recipes/fetch-recipes-show-only-favourites';
export const SHOW_ALL = 'recipes/fetch-recipes-show-all';

const generateRecipes = () => {
    const step = {
        number: 1,
        name: "A simple step",
        content: "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
        image: "",
    };

    const recipes = [];

    // thumbnail, name, preparation- and cooking time, type of recipe
    for (let i = 1; i < 11; i++) {
        recipes.push({
            id: i,
            name: "Pizza",
            type: "Italian dish",
            summary: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
            steps: [step, step, step],
            ingredients: ["Tomatoes", "Carrots", "Rice"],
            preparationTime: 45,
            cookingTime: 125,
            thumbnail: "",
        });
    }
    return recipes;
}


export const fetchRecipes = (dispatch) => {

    dispatch({
        type: FETCH_RECIPES
    });

    dispatch({
        type: FETCH_RECIPES_SUCCESS,
        recipes: generateRecipes()
    });

    /*
    axios.get('recipes').then(res => {
        return dispatch({
            type: FETCH_RECIPES,
            recipes: res.data
        });
    });
     */
};

export const fetchFavourites = (dispatch) => {
    dispatch({
        type: FETCH_RECIPES
    });

    const allRecipes = generateRecipes();

    dispatch({
        type: FETCH_RECIPES_SUCCESS,
        recipes: [allRecipes[0], allRecipes[1], allRecipes[2]]
    });
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