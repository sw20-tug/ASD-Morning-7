import React from 'react';
import {configure, shallow} from 'enzyme';
import mount from 'enzyme';

import RecipesList from './RecipesList';
import Adapter from 'enzyme-adapter-react-16';
import render from 'react-test-renderer';

configure({ adapter: new Adapter() });


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

test('table rows', () => {
    expect(true);
});

test('dummy test', () => {
    const cols = [
        { header: 'Name'},
        { header: 'Preparation time (min)'},
        { header: 'Cooking time (min)'},
        { header: 'Type'}
    ];

    const container = render.create(<RecipesList recipes={generateRecipes()}/>);   // There should be ONLY 1 table element
    //const table = container.find('table');
    const containerJSON = container.toJSON();
    console.log("container json", containerJSON.children[0]);
});