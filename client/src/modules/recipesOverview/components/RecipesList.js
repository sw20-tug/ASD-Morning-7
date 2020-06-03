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
import TableSortLabel from '@material-ui/core/TableSortLabel';

export default function RecipesList(props) {

    // source for sorting feature:
    // https://material-ui.com/components/tables/
    // accessed 03.06.2020 at 08:40

    const [orderColumnType, setOrderColumnType] = React.useState('asc');
    const [orderColumn, setOrderColumn] = React.useState('name');

    const ascComparator = (itemA, itemB, column) => {
        if (itemA[column] < itemB[column]) {
            return -1;
        } else if (itemA[column] > itemB[column]) {
            return 1;
        } else {
            return 0;
        }
    };

    const comparator = (orderType, column) => {
        if (orderType === 'asc') {
            return (itemA, itemB) => ascComparator(itemA, itemB, column);
        } else if (orderType === 'desc') {
            return (itemA, itemB) => -ascComparator(itemA, itemB, column);
        }
    };

    const sortData = (data, comparator) => {
        let data_sort = data.map((item, index) => [item, index]);
        data_sort.sort((itemA, itemB) => {
            const comperatorResult = comparator(itemA[0], itemB[0]);
            if (comperatorResult !== 0) {
                return comperatorResult;
            } else {
                return itemA[1] - itemB[1];
            }
        });
        return data_sort.map(item => item[0]);
    };

    const startSort = (columnId) => {
        setOrderColumnType((orderColumn === columnId && orderColumnType === 'desc') ? 'asc' : 'desc');
        setOrderColumn(columnId);
    };

    const cells = [
        {id: 'name', name: 'Name'},
        {id: 'preparationTime', name: 'Preparation time (min)'},
        {id: 'cookingTime', name: 'Cooking time (min)'},
        {id: 'type', name: 'Type'},
        {id: 'settings', name: 'Settings'},
    ];

    return props.recipes.length === 0 ?
        (<Typography variant="body1" component="h6">There are no recipes to show</Typography>)
        :
        (<TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {cells.map((cell, index) => <TableCell
                            key={cell.id}
                            sortDirection={orderColumn === cell.id ? orderColumnType : false}>
                            {index < cells.length - 1 ?
                                <TableSortLabel
                                    active={orderColumn === cell.id}
                                    direction={orderColumn === cell.id ? orderColumnType : 'asc'}
                                    onClick={() => startSort(cell.id)}
                                >
                                    {cell.name}
                                </TableSortLabel>
                                : cell.name
                            }

                        </TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/*
                        props.recipes.map((recipe, index) => <RecipesListRow
                            key={index}
                            index={index}
                            recipe={recipe}
                            editRecipeName={props.editRecipeName}
                            showAddRecipeDialog={props.showAddRecipeDialog}
                            setRecipeToEdit={props.setRecipeToEdit}
                            deleteRecipe={props.deleteRecipe}
                        />
                    )
                    */
                        sortData(props.recipes, comparator(orderColumnType, orderColumn))
                            .map((recipe, index) =>
                                <RecipesListRow
                                    key={index}
                                    index={index}
                                    recipe={recipe}
                                    editRecipeName={props.editRecipeName}
                                    showAddRecipeDialog={props.showAddRecipeDialog}
                                    setRecipeToEdit={props.setRecipeToEdit}
                                    deleteRecipe={props.deleteRecipe}
                                    setDisableRecipeDialogInputs={props.setDisableRecipeDialogInputs}
                                />
                            )
                    }
                </TableBody>
            </Table>
        </TableContainer>);

}