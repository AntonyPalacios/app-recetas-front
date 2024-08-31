import {combineReducers} from "redux";
import {recipeReducer,modalReducer,recipeToEditReducer} from "./recipes";
import {ingredientReducer} from "./ingredients";


export const reducer = combineReducers({
    recipes: combineReducers({
        entities: recipeReducer,
        modal: modalReducer,
        recipeToEdit: recipeToEditReducer
    }),
    ingredients: ingredientReducer
})