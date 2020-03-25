import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router";
import {HashRouter, Link} from "react-router-dom";
import RecipesOverview from "../recipesOverview/RecipesOverview";
import Navigation from './components/Navigation';
import {showOnlyFavourites} from "../recipesOverview/recipesOverviewActions";

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <div style={{marginLeft: 25, marginRight: 25}}>
                    <Navigation showOnlyFavourites={this.props.showOnlyFavourites}/>
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
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        showOnlyFavourites: (enable) => showOnlyFavourites(dispatch, enable)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

