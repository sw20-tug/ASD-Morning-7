import React, {useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditNameIcon from '@material-ui/icons/Edit';
import SaveNameIcon from '@material-ui/icons/Done';
import EditRecipeIcon from '@material-ui/icons/Settings';

export default function RecipesListRow(props) {
    const [editMode, setEditMode] = useState(false);
    const [nameEdited, setNameEdited] = useState(props.recipe.name);

    const saveRecipeName = () => {
        if (nameEdited !== props.recipe.name) {
            props.editRecipeName(props.recipe.id, nameEdited);
        }
        setEditMode(false)
    };

    const getEditNameAction = () => {
        return editMode ? saveRecipeName() : setEditMode(true);
    };

    const getEditNameActionIcon = () => {
        return editMode ? <SaveNameIcon/> : <EditNameIcon/>;
    };

    return <TableRow key={props.index}>
        <TableCell>
            <div style={{display: 'flex', alignItems: 'center'}}>

                <img style={{height: 75, marginRight: 15, borderRadius: 5}} alt="thumbnail"
                     src={props.recipe.thumbnail}/>

                {
                    !editMode
                        ? props.recipe.name
                        : <TextField
                            label="Name"
                            variant="outlined"
                            value={nameEdited}

                            onChange={(event) => setNameEdited(event.target.value)}
                        />
                }

                <IconButton color={'primary'} onClick={getEditNameAction}>
                    {getEditNameActionIcon()}
                </IconButton>

            </div>
        </TableCell>
        <TableCell>{props.recipe.preparationTime}</TableCell>
        <TableCell>{props.recipe.cookingTime}</TableCell>
        <TableCell>{props.recipe.type}</TableCell>
        <TableCell>
            <IconButton color={'primary'} onClick={() => {
                props.setRecipeToEdit(props.recipe);
                props.showAddRecipeDialog();
            }}>
                <EditRecipeIcon/>
            </IconButton>
        </TableCell>
    </TableRow>;
}