import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

class Navigation extends React.Component {

    render() {
        return (
            <div style={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                        <Typography variant="h6">
                            COOK
                        </Typography>
                        <div>
                            <Button color="inherit" onClick={() => this.props.showOnlyFavourites(false)}>All Recipes</Button>
                            <Button color="inherit" onClick={() => this.props.showOnlyFavourites(true)}>Favourites</Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Navigation;