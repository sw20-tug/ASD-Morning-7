import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import ThumbnailUploader from "./ThumbnailUploader";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add'
import Step from "./Step";

export default function AddRecipeDialog(props) {

    const [recipe, setRecipe] = useState({
        name: "",
        type: "",
        summary: "",
        steps: [{
            number: 1,
            name: "",
            content: "",
            image: ""
        }],
        ingredients: [""],
        preparationTime: 0,
        cookingTime: 0,
        thumbnail: ""
    });

    const addIngredient = (ingredient) => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ingredient]})
    };

    const setIngredient = (index, value) => {
        const ingredientsClone = [...recipe.ingredients];
        ingredientsClone[index] = value;

        setRecipe({...recipe, ingredients: ingredientsClone});
    };

    const setThumbnail = (thumbnail) => {
        setRecipe({...recipe, thumbnail: thumbnail});
    };

    const addStep = () => {
        setRecipe({
            ...recipe, steps: [...recipe.steps, {
                number: recipe.steps.length + 1,
                name: "",
                content: "",
                image: ""
            }]
        })
    };

    const setStep = (index, key, value) => {
        const step = {...recipe.steps[index]};

        if (!step.hasOwnProperty(key)) {
            return;
        }

        step[key] = value;

        const stepsClone = [...recipe.steps];
        stepsClone[index] = step;

        setRecipe({...recipe, steps: stepsClone});
    };

    const removeStep = (index) => {
        const stepsClone = recipe.steps;
        stepsClone.splice(index, 1);
        setRecipe({...recipe, steps: stepsClone});
    };

    const buildButtonProperties = (counter) => {
        return (counter === recipe.ingredients.length - 1) ?
            {
                color: 'primary',
                isDeleteIcon: false,
                action: () => addIngredient("")
            } :
            {
                color: 'secondary',
                isDeleteIcon: true,
                action: () => {
                    let ingredientsClone = recipe.ingredients;
                    ingredientsClone.splice(counter, 1);
                    setRecipe({...recipe, ingredients: ingredientsClone});
                }
            }
    };

    const buildIngredientTextFields = () => {
        const ingredientTextFields = [];
        for (let counter = 0; counter < recipe.ingredients.length; counter++) {
            let buttonProperties = buildButtonProperties(counter);
            ingredientTextFields.push(
                <div
                    id={counter.toString()}
                    style={{display: 'flex', alignItems: 'center', marginTop: 10}}
                >
                    <TextField
                        style={{width: '100%'}}
                        label="Ingredient Name"
                        variant="outlined"
                        value={(recipe.ingredients[counter] === undefined) ? "" : recipe.ingredients[counter]}
                        onChange={(event) => setIngredient(counter, event.target.value)}
                    />
                    <div style={{marginLeft: 10}}>
                        <IconButton
                            color={buttonProperties.color}
                            onClick={buttonProperties.action}
                            variant="contained"
                        >
                            {buttonProperties.isDeleteIcon ? <DeleteIcon/> : <AddIcon/>}
                        </IconButton>

                    </div>
                </div>
            );
        }

        return ingredientTextFields;
    };

    const generateSteps = () => {
        const steps = [];

        for (let i = 0; i < recipe.steps.length; i++) {
            steps.push(<Step key={i} {...recipe.steps[i]} setStep={setStep} removeStep={removeStep}/>);
        }

        return steps;
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
                    key="name"
                    style={{width: '100%'}}
                    label="Name"
                    variant="outlined"
                    onChange={(event) => setRecipe({...recipe, name: event.target.value})}
                />
                <TextField
                    key="category"
                    style={{marginTop: 10, width: '100%'}}
                    label="Category"
                    variant="outlined"
                    onChange={(event) => setRecipe({...recipe, type: event.target.value})}
                />
                <TextField
                    key="description"
                    style={{marginTop: 10, width: '100%'}}
                    label="Description"
                    variant="outlined"
                    multiline
                    rows="4"
                    onChange={(event) => setRecipe({...recipe, summary: event.target.value})}
                />
                <div style={{marginTop: 10, width: '100%'}}>
                    <TextField
                        key="preparation-time"
                        style={{marginRight: 10, width: '45%'}}
                        label="Preparation Time"
                        variant="outlined"
                        onChange={(event) => setRecipe({...recipe, preparationTime: event.target.value})}
                    />
                    <TextField
                        key="cooking-time"
                        style={{width: '45%'}}
                        label="Cooking Time"
                        variant="outlined"
                        onChange={(event) => setRecipe({...recipe, cookingTime: event.target.value})}
                    />
                </div>

                <div style={{textAlign: 'left'}}>
                    {buildIngredientTextFields()}
                </div>

                <ThumbnailUploader setThumbnail={setThumbnail} thumbnail={recipe.thumbnail}/>

                {generateSteps()}

                <div style={{marginTop: 10}}>
                    <Button variant="contained" color="primary" onClick={addStep}>
                        Add Step
                    </Button>
                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>Cancel</Button>
                <Button variant={'contained'} color="primary">Add Recipe</Button>
            </DialogActions>
        </Dialog>
    );

};