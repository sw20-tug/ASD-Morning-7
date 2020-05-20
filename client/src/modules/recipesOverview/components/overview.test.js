import React from 'react';
import {configure, shallow} from 'enzyme';
import mount from 'enzyme';

import RecipesList from './RecipesList';


import Adapter from 'enzyme-adapter-react-16';
import render from 'react-test-renderer';

configure({adapter: new Adapter()});


const generateRecipes = () => {
    const step = {
        number: 1,
        name: "A simple step",
        content: "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
        image: "",
    };

    const recipes = [];

    // thumbnail, name, preparation- and cooking time, type of recipe
    for (let i = 1; i < 11; i++) {
        recipes.push({
            name: "Pizza",
            type: "Italian dish",
            summary: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
            steps: [step, step, step],
            ingredients: ["Tomatoes", "Carrots", "Rice"],
            preparationTime: 45,
            cookingTime: 125,
            thumbnail: "",
        });
    }
    return recipes;
};

const tableContainerJson = render.create(<RecipesList recipes={generateRecipes()}/>).toJSON();

test('check the table head', () => {
    // render recipe list (table)

    const tableHead = tableContainerJson.children[0].children[0].children[0];
    expect(tableHead.children[0].children[0]).toBe('Name');
    expect(tableHead.children[1].children[0]).toBe('Preparation time (min)');
    expect(tableHead.children[2].children[0]).toBe('Cooking time (min)');
    expect(tableHead.children[3].children[0]).toBe('Type');
});

test('check if there is the correct amount of recipes inside the recipe overview table', () => {
    expect(tableContainerJson.children[0].children[1].children.length).toBe(10);
});

/* disabled since context menu includes it now
test('check if rename button exists', () => {
    tableContainerJson.children[0].children[1].children.map(row => expect(row.children[0].children[0].children[2].type).toBe('button'));
});
 */