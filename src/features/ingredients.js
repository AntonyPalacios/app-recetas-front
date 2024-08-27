import {asyncMac, mat} from "./utils";


const asyncRecipes = mat('ingredient') //make async types
const [setPending, setFulfilled, setError]  = asyncMac(asyncRecipes)

export const getIngredients = () => async dispatch => {
    dispatch(setPending())
    try {
        const response = await fetch('http://localhost:8000/ingredients/')
        const data = await response.json()
        dispatch(setFulfilled(data))
    } catch (e) {
        dispatch(setError(e.message))
    }
}

export const selectIngredients = state => {
    const {ingredients} = state
    return ingredients
}


export const ingredientReducer = (state = [], action) => {
    switch (action.type) {
        case 'ingredient/add': {
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        }
        case 'ingredient/get': {
            return state
        }
        case 'ingredient/fulfilled':{
            return action.payload
            /*{
                ...state,
                ingredients: action.payload

            }*/
        }
        default:
            return state
    }
}