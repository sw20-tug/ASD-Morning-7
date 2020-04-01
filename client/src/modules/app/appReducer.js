import {
    SHOW_ADD_RECIPE_DIALOG,
    HIDE_ADD_RECIPE_DIALOG
} from './appActions'

const initState = {
    addRecipeDialogVisible: false,
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case SHOW_ADD_RECIPE_DIALOG:
            return {
                ...state,
                addRecipeDialogVisible: true
            };
        case HIDE_ADD_RECIPE_DIALOG:
            return {
                ...state,
                addRecipeDialogVisible: false
            };
        default:
            return state;
    }
};

export default appReducer;