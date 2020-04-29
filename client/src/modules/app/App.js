import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router";
import {HashRouter, Link} from "react-router-dom";
import RecipesOverview from "../recipesOverview/RecipesOverview";
import Navigation from './components/Navigation';
import {addRecipe, showOnlyFavourites} from "../recipes/recipesActions";
import {hideAddRecipeDialog, showAddRecipeDialog} from "./appActions";
import appReducer from "./appReducer";

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <div style={{marginLeft: 25, marginRight: 25}}>
                    <Navigation
                        showOnlyFavourites={this.props.showOnlyFavourites}
                        addRecipeDialogVisible={this.props.addRecipeDialogVisible}
                        showAddRecipeDialog={this.props.showAddRecipeDialog}
                        hideAddRecipeDialog={this.props.hideAddRecipeDialog}
                        addRecipe={this.props.addRecipe}
                    />
                    <Switch>
                        <Route exact path={'/'} render={(props) => {
                            return <RecipesOverview props={props}/>
                        }}/>
                        {
                            /*
    <Route exact path={'/recipes/'} render={(props) => {
                            return <RecipesOverview props={props}/>
                        }}/>
                             */
                        }

                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addRecipeDialogVisible: state.appReducer.addRecipeDialogVisible
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showOnlyFavourites: (enable) => showOnlyFavourites(dispatch, enable),
        showAddRecipeDialog: () => showAddRecipeDialog(dispatch),
        hideAddRecipeDialog: () => hideAddRecipeDialog(dispatch),
        addRecipe: (recipe) => addRecipe(dispatch, recipe)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

