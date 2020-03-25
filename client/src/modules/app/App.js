import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router";
import {HashRouter, Link} from "react-router-dom";
import RecipesOverview from "../recipesOverview/RecipesOverview";

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <h1>Recipes</h1>
                <Link to='/recipes/'>Recipes</Link>
                <Switch>
                    <Route exact path={'/'} render={(props) => {
                        return <h2>Home</h2>;
                    }}/>
                    <Route exact path={'/recipes/'} render={(props) => {
                        return <RecipesOverview props={props}/>
                    }}/>
                </Switch>
            </HashRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

