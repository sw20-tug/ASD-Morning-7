import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import Dropzone from "react-dropzone";
import ThumbnailUploader from "./ThumbnailUploader";

export default function AddRecipeDialog(props) {

    const [recipe, setRecipe] = useState({
        name: "",
        type: "",
        summary: "",
        steps: [],
        ingredients: [],
        preparationTime: 0,
        cookingTime: 0,
        thumbnail: ""
    });

    const addIngredient = (ingredient) => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ingredient]})
    };

    const [ingredientFieldIdCounter, setIngredientFieldIdCounter] = useState(0);

    const buildIngredientTextFields = () => {
        const ingredientTextFields = [];

        for (let i = 0; i < ingredientFieldIdCounter; i++) {
            ingredientTextFields.push(
                <TextField
                    id={i}
                    style={{width: '100%'}}
                    label="Ingredient Name"
                    variant="outlined"
                />
            );
        }
        return ingredientTextFields;
    };

    return (
        <Dialog
            open={props.open}
            onClose={props.close}
            maxWidth='sm'
        >
            <DialogTitle>Add a new recipe</DialogTitle>
            <DialogContent>
                {/*
                <DialogContentText>test texttest texttest texttest texttest texttest texttest texttest texttest texttest
                    texttest texttest texttest texttest texttest text</DialogContentText>
                */}
                <TextField
                    style={{width: '100%'}}
                    label="Name"
                    variant="outlined"
                    onChange={(event) => setRecipe({...recipe, name: event.target.value})}
                />
                <TextField
                    style={{marginTop: 10, width: '100%'}}
                    label="Category"
                    variant="outlined"
                    onChange={(event) => setRecipe({...recipe, type: event.target.value})}
                />
                <TextField
                    style={{marginTop: 10, width: '100%'}}
                    label="Description"
                    variant="outlined"
                    multiline
                    rows="4"
                    onChange={(event) => setRecipe({...recipe, summary: event.target.value})}
                />
                <div style={{marginTop: 10, width: '100%'}}>
                    <TextField
                        style={{marginRight: 10, width: '45%'}}
                        label="Preparation Time"
                        variant="outlined"
                        onChange={(event) => setRecipe({...recipe, preparationTime: event.target.value})}
                    />
                    <TextField
                        style={{width: '45%'}}
                        label="Cooking Time"
                        variant="outlined"
                        onChange={(event) => setRecipe({...recipe, cookingTime: event.target.value})}
                    />
                </div>

                <div>
                    {buildIngredientTextFields()}
                    <Button onClick={() => setIngredientFieldIdCounter(ingredientFieldIdCounter + 1)}>Add</Button>
                </div>
                <ThumbnailUploader/>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Cancel</Button>
                <Button variant={'contained'}>Add Recipe</Button>
            </DialogActions>
        </Dialog>
    );

};