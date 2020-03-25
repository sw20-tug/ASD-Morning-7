import React from 'react';
import {connect} from 'react-redux';
import {fetchRecipes} from "./recipesOverviewActions";
import {Link} from "react-router-dom";


class RecipesOverview extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.fetchRecipes);
        this.props.fetchRecipes();
    }

    render() {
        return (
            <div>
                <h2>Recipes Overview</h2>
                <Link to='/'>Back Home</Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        recipes: state.appReducer.recipes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRecipes: () => fetchRecipes(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesOverview);

