import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {FormControlLabel, TextField} from "@material-ui/core";
import ThumbnailUploader from "./ThumbnailUploader";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add'
import Step from "./Step";
import {prepareRecipeForClient} from "../../../recipes/recipesActions";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from "@material-ui/core/FormGroup";

// let recipeToEditInit = false;

export default function RecipeDialog(props) {

    const [oldRecipeInit, setOldRecipeInit] = useState(null);

    const initRecipe = {
        name: "",
        type: "",
        description: "",
        steps: [{
            // this will be set after
            // before sending the
            // finished recipe
            // to the api
            number: -1,
            name: "",
            content: "",
            image: ""
        }],
        ingredients: [""],
        preparationTime: 0,
        cookingTime: 0,
        thumbnail: "",
        isFavorite: false
    };

    const [recipe, setRecipe] = useState({...initRecipe});

    // reset recipe to edit
    if (props.recipeToEdit === undefined || props.recipeToEdit === null) {

        if (oldRecipeInit !== null && oldRecipeInit !== props.recipeToEdit) {
            setOldRecipeInit(null);
            setRecipe(initRecipe);
        }

        // set recipe to edit
    } else if (oldRecipeInit === null || oldRecipeInit !== props.recipeToEdit) {
        setOldRecipeInit(props.recipeToEdit);
        setRecipe({...props.recipeToEdit})

    }

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
        const removed = stepsClone.splice(index, 1);
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
        if (!Array.isArray(recipe.ingredients)) {
            // todo: find out why this is necessary
            prepareRecipeForClient(recipe);
        }
        for (let counter = 0; counter < recipe.ingredients.length; counter++) {
            let buttonProperties = buildButtonProperties(counter);
            ingredientTextFields.push(
                <div
                    id={counter.toString()}
                    key={counter}
                    style={{display: 'flex', alignItems: 'center', marginTop: 10}}
                >
                    <TextField
                        style={{width: '100%'}}
                        label="Ingredient Name"
                        variant="outlined"
                        value={(recipe.ingredients[counter] === undefined) ? "" : recipe.ingredients[counter]}
                        onChange={(event) => setIngredient(counter, event.target.value)}
                        disabled={props.disableEditing}
                    />
                    {props.disableEditing ? null :
                        <div style={{marginLeft: 10}}>
                        <IconButton
                        color={buttonProperties.color}
                        onClick={buttonProperties.action}
                        variant="contained"
                        >
                        {buttonProperties.isDeleteIcon ? <DeleteIcon/> : <AddIcon/>}
                        </IconButton>

                        </div>
                    }

                </div>
            );
        }

        return ingredientTextFields;
    };

    const generateSteps = () => {
        const steps = [];
        for (let i = 1; i <= recipe.steps.length; i++) {
            steps.push(
                <Step
                    step={{...recipe.steps[i - 1]}}
                    key={i}
                    number={recipe.steps[i - 1].number === -1 ? 1 : recipe.steps[i - 1].number}
                    stepsCount={recipe.steps.length}
                    setStep={setStep}
                    removeStep={removeStep}
                    disableEditing={props.disableEditing}
                />
            );
        }

        return steps;
    };

    const buildApplyButtonAction = () => {
        if (!recipe.thumbnail ||
            !recipe.name ||
            !recipe.type ||
            !recipe.description ||
            !recipe.cookingTime ||
            !recipe.preparationTime) {
            return alert("Please check your input");
        }

        return recipe.hasOwnProperty('id') ? props.updateRecipe(recipe) : props.addRecipe(recipe);
    };

    const buildApplyButtonLabel = () => recipe.hasOwnProperty('id') ? 'Update Recipe' : 'Add Recipe';

    return (
        <Dialog
            open={props.open}
            onClose={props.close}
            maxWidth='sm'
        >
            <DialogTitle>{recipe.hasOwnProperty('id') ? 'Update recipe' : 'Add a new recipe'}</DialogTitle>
            <DialogContent>
                <TextField
                    key="name"
                    style={{width: '100%'}}
                    label="Name"
                    value={recipe.name}
                    variant="outlined"
                    onChange={(event) => setRecipe({...recipe, name: event.target.value})}
                    disabled={props.disableEditing}
                />
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={recipe.isFavorite}
                                onChange={(event) => setRecipe({...recipe, isFavorite: event.target.checked})}
                                name="is favorite checkbox"
                                color="primary"
                                disabled={props.disableEditing}
                            />
                        }
                        label="Add to favorite recipes"/>
                </FormGroup>
                <TextField
                    key="category"
                    style={{marginTop: 10, width: '100%'}}
                    label="Category"
                    value={recipe.type}
                    variant="outlined"
                    onChange={(event) => setRecipe({...recipe, type: event.target.value})}
                    disabled={props.disableEditing}
                />
                <TextField
                    key="description"
                    style={{marginTop: 10, width: '100%'}}
                    label="Description"
                    value={recipe.description}
                    variant="outlined"
                    multiline
                    rows="4"
                    onChange={(event) => setRecipe({...recipe, description: event.target.value})}
                    disabled={props.disableEditing}
                />
                <div style={{marginTop: 10, width: '100%'}}>
                    <TextField
                        key="preparation-time"
                        style={{marginRight: 10, width: '45%'}}
                        label="Preparation Time"
                        value={recipe.preparationTime}
                        variant="outlined"
                        onChange={(event) => setRecipe({...recipe, preparationTime: event.target.value})}
                        disabled={props.disableEditing}
                    />
                    <TextField
                        key="cooking-time"
                        style={{width: '45%'}}
                        label="Cooking Time"
                        value={recipe.cookingTime}
                        variant="outlined"
                        onChange={(event) => setRecipe({...recipe, cookingTime: event.target.value})}
                        disabled={props.disableEditing}
                    />
                </div>

                <div style={{textAlign: 'left'}}>
                    {buildIngredientTextFields()}
                </div>

                <ThumbnailUploader
                    setThumbnail={setThumbnail}
                    thumbnail={recipe.thumbnail}
                    disableEditing={props.disableEditing}
                />

                {generateSteps()}

                <div style={{marginTop: 10}}>
                    <Button variant="contained" color="primary" onClick={addStep}>
                        Add Step
                    </Button>
                </div>

            </DialogContent>
            <DialogActions>
                <Button variant={'contained'} onClick={() => {
                    props.close();
                    props.setDisableRecipeDialogInputs(false);
                }}>Cancel</Button>
                {props.disableEditing ?
                    null :
                    <Button variant={'contained'} onClick={buildApplyButtonAction} color="primary">
                        {buildApplyButtonLabel()}
                    </Button>}
            </DialogActions>
        </Dialog>
    );

};