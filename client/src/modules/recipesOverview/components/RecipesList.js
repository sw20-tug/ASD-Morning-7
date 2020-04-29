import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const buildTableRow = (recipe, index) => {
    return <TableRow key={index}>
        <TableCell>{recipe.name}</TableCell>
        <TableCell>{recipe.preparationTime}</TableCell>
        <TableCell>{recipe.cookingTime}</TableCell>
        <TableCell>{recipe.type}</TableCell>
    </TableRow>
};

export default function RecipesList(props) {
    return (
        <TableContainer component={Paper}>
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
                    {props.recipes.map((recipe, index) => buildTableRow(recipe, index))}
                </TableBody>
            </Table>
        </TableContainer>
    );

}