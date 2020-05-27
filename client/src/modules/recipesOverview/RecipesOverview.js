import React from 'react';
import {connect} from 'react-redux';
import {deleteRecipe, editRecipeName, fetchFavourites, fetchRecipes} from "../recipes/recipesActions";
import RecipesList from "./components/RecipesList";
import Typography from "@material-ui/core/Typography";
import {TextField} from "@material-ui/core";


class RecipesOverview extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.showOnlyFavourites) {
            this.props.fetchFavourites();
            return;
        }
        this.props.fetchRecipes();
    }

    render() {
        if (this.props.fetchRecipesLoading) {
            return <div>Loading</div>;
        }

        if (!this.props.fetchRecipesLoading && this.props.fetchRecipesFailure) {
            return <div>ERROR: Could not load recipes</div>;
        }

        return (
            <div>
                <Typography style={{marginTop: 50, marginBottom: 10}} variant="h4" component="h1">Recipes</Typography>
                <TextField
                    variant="outlined"
                    label="Search Recipes"
                    onChange={(event) => this.props.searchRecipes(event.target.value)}
                    style={{marginTop: 5, marginBottom: 10}}
                />
                <RecipesList
                    recipes={this.props.recipes}
                    editRecipeName={this.props.editRecipeName}
                    showAddRecipeDialog={this.props.showAddRecipeDialog}
                    setRecipeToEdit={this.props.setRecipeToEdit}
                    deleteRecipe={this.props.deleteRecipe}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        recipes: state.recipesOverviewReducer.recipes,
        fetchRecipesLoading: state.recipesOverviewReducer.fetchRecipesLoading,
        fetchRecipesSuccess: state.recipesOverviewReducer.fetchRecipesSuccess,
        fetchRecipesFailure: state.recipesOverviewReducer.fetchRecipesFailure,
        showOnlyFavourites: state.recipesOverviewReducer.showOnlyFavourites
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRecipes: () => fetchRecipes(dispatch),
        fetchFavourites: () => fetchFavourites(dispatch),
        editRecipeName: (recipe, newName) => editRecipeName(dispatch, recipe, newName),
        deleteRecipe: (recipe) => deleteRecipe(dispatch, recipe)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesOverview);

