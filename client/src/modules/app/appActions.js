export const SHOW_ADD_RECIPE_DIALOG = 'app/show-add-recipe-dialog';
export const HIDE_ADD_RECIPE_DIALOG = 'app/show-hide-recipe-dialog';

export const showAddRecipeDialog = (dispatch) => {
    dispatch({type: SHOW_ADD_RECIPE_DIALOG});
};

export const hideAddRecipeDialog = (dispatch) => {
    dispatch({type: HIDE_ADD_RECIPE_DIALOG});
};
