import React, {useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {Menu, TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditNameIcon from '@material-ui/icons/Edit';
import SaveNameIcon from '@material-ui/icons/Done';
import RecipeSettingsIcon from '@material-ui/icons/Settings';
import MenuItem from "@material-ui/core/MenuItem";
import EditRecipeNameIcon from '@material-ui/icons/Create';
import EditRecipeIcon from '@material-ui/icons/Dashboard';
import DeleteRecipeIcon from '@material-ui/icons/DeleteForever';

export default function RecipesListRow(props) {

    const [contextMenuAnchorElement, setContextMenuAnchorElement] = React.useState(null);

    const contextMenu = <Menu
        elevation={2}
        anchorEl={contextMenuAnchorElement}
        open={contextMenuAnchorElement !== null}
        onClose={() => setContextMenuAnchorElement(null)}
    >
        <MenuItem onClick={() => {
            setEditMode(true);
            setContextMenuAnchorElement(null);
        }}>
            <EditRecipeNameIcon color={'primary'} style={{marginRight: 10}}/> Rename
        </MenuItem>

        <MenuItem onClick={() => {
            props.setRecipeToEdit(props.recipe);
            props.showAddRecipeDialog();
            setContextMenuAnchorElement(null);
        }}>
            <EditRecipeIcon color={'primary'} style={{marginRight: 10}}/> Edit
        </MenuItem>

        <MenuItem>
            <DeleteRecipeIcon color={'secondary'} style={{marginRight: 10}}/> Delete
        </MenuItem>
    </Menu>;

    const [editMode, setEditMode] = useState(false);
    const [nameEdited, setNameEdited] = useState(props.recipe.name);

    const saveRecipeName = () => {
        if (nameEdited !== props.recipe.name) {
            props.editRecipeName(props.recipe, nameEdited);
        }
        setEditMode(false)
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

                {
                    editMode ?
                        <IconButton color={'primary'} onClick={saveRecipeName}>
                            <SaveNameIcon/>
                        </IconButton>
                        :
                        null
                }

            </div>
        </TableCell>
        <TableCell>{props.recipe.preparationTime}</TableCell>
        <TableCell>{props.recipe.cookingTime}</TableCell>
        <TableCell>{props.recipe.type}</TableCell>
        <TableCell>
            <IconButton onClick={(event) => setContextMenuAnchorElement(event.target)} color={'primary'}>
                <RecipeSettingsIcon/>
            </IconButton>
            {contextMenu}
        </TableCell>
    </TableRow>;
}