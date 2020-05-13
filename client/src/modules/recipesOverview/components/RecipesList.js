import React, {useState} from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import RecipesListRow from "./RecipesListRow";

export default function RecipesList(props) {

    return props.recipes.length === 0 ?
        (<Typography variant="body1" component="h6">There are no recipes to show</Typography>)
        :
        (<TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Preparation time (min)</TableCell>
                        <TableCell>Cooking time (min)</TableCell>
                        <TableCell>Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.recipes.map((recipe, index) => <RecipesListRow index={index}
                                                                          recipe={recipe}
                                                                          editRecipeName={props.editRecipeName}/>)}
                </TableBody>
            </Table>
        </TableContainer>);

}