import React from 'react';
import {connect} from 'react-redux';
import {fetchFavourites, fetchRecipes} from "./recipesOverviewActions";
import RecipesList from "./components/RecipesList";
import Typography from "@material-ui/core/Typography";


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
                <RecipesList recipes={this.props.recipes}/>
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
        fetchFavourites: () => fetchFavourites(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesOverview);

