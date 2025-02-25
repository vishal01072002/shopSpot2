import { combineReducers } from "@reduxjs/toolkit";

const initialState={
    cart: JSON.parse(localStorage.getItem('userCart')) === null ? [] : JSON.parse(localStorage.getItem('userCart')),
    user: JSON.parse(localStorage.getItem('shopspotUser')) === null ? {} : JSON.parse(localStorage.getItem('shopspotUser')),
    productPageFilters: {
        search: '',
        sortBy: 'Default',
        category: 'ALL'
    },
    popups: {
        orderPlaced: false,
        productDeleted: '',
        productModified: '',
        productAdded: ''
    }
};
const UserReducer = (state = initialState.user, action) => {
    switch(action.type) {
        case 'login':
            sessionStorage.setItem('currentUser', JSON.stringify(action.payload));
            return action.payload;
        case 'logout':
            (localStorage.setItem('shopspotUser',null));
            sessionStorage.removeItem('currentUser');
            return {};
        default:
            return state;
    }
}

const CartReducer = (state = initialState.cart, action) => {
    switch(action.type) {
        case 'addCart':
            sessionStorage.setItem('userCart', JSON.stringify(action.payload));
            return action.payload;
        case 'removeCart':
            (localStorage.setItem('userCart', JSON.stringify(action.payload)));
            return action.payload;
        default:
            return state;
    }
}

const productPageFiltersReducer = (state = initialState.productPageFilters, action) => {
    switch(action.type) {
        case 'setSearch':
            return {...state, search: action.payload};
        case 'setCategory':
            return {...state, category: action.payload};
        case 'setSortBy':
            return {...state, sortBy: action.payload};
        default:
            return state;
    }
}

const popupsReducer = (state = initialState.popups, action) => {
    switch(action.type) {
        case 'setOrderPlacedTrue':
            return {...state, orderPlaced: true};
        case 'setorderPlacedFalse':
            return {...state, orderPlaced: false};
        case 'setProductDeleted':
            return {...state, productDeleted: action.payload};
        case 'setProductModified':
            return {...state, productModified: action.payload};
        case 'setProductAdded':
            return {...state, productAdded: action.payload};
        default:
            return state;
    }
}

const AppReducer = combineReducers({
    user: UserReducer,
    productPageFilters: productPageFiltersReducer,
    popups: popupsReducer,
    cart : CartReducer,
  });
    
  export default AppReducer;
