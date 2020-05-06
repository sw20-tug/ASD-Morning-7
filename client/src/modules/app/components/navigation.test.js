import React from 'react';
import {configure, shallow} from 'enzyme';
import mount from 'enzyme';

import Navigation from './Navigation';


import Adapter from 'enzyme-adapter-react-16';
import render from 'react-test-renderer';

configure({ adapter: new Adapter() });

const navigationJson = render.create(<Navigation />).toJSON();


test('check navigation title', () => {
    expect(navigationJson.children[0].children[0].children[0].children[0]).toBe('COOK');
});

const navigationItems = navigationJson.children[0].children[0].children[1];
test('check navigation menu item names', () => {
    expect(navigationItems.children[0].children[0].children[0]).toBe('All Recipes');
    expect(navigationItems.children[1].children[0].children[0]).toBe('Favourites');
    // todo add recipe check
});

test('check if the amount of items in navigation menu', () => {
    expect(navigationItems.children.length).toBe(2);
    // todo: update to 3 when on most recent version
})
