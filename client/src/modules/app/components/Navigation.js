import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import RecipeDialog from "./RecipeDialog/RecipeDialog";

class Navigation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                        <Typography variant="h6">
                            COOK
                        </Typography>
                        <div>
                            <Button color="inherit" onClick={() => this.props.showOnlyFavourites(false)}>All
                                Recipes</Button>
                            <Button color="inherit"
                                    onClick={() => this.props.showOnlyFavourites(true)}>Favourites</Button>
                            <Button color="inherit" onClick={this.props.showAddRecipeDialog}>Add Recipe</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <RecipeDialog
                    open={this.props.addRecipeDialogVisible}
                    close={() => {
                        this.props.setRecipeToEdit(null);
                        this.props.hideAddRecipeDialog();
                    }}
                    addRecipe={this.props.addRecipe}
                    updateRecipe={this.props.updateRecipe}
                    recipeToEdit={this.props.recipeToEdit}
                    setRecipeToEdit={this.props.setRecipeToEdit}
                />
            </div>
        );
    }
}

export default Navigation;