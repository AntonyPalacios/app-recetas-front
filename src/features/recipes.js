import {asyncMac, mac, mat} from "./utils";


const asyncRecipes = mat('recipe') //make async types
const [setPending, setFulfilled, setError] = asyncMac(asyncRecipes)

export const selectRecipes = state => {
    console.log(state)
    const {recipes: {entities}} = state
    return entities
}

export const addRecipe = mac('recipe/add', 'payload')

export const isModalOpen = state => state.recipes.modal


export const getRecipes = () => async dispatch => {
    dispatch(setPending())
    try {
        const response = await fetch('http://localhost:8000/recipes/')
        const data = await response.json()
        dispatch(setFulfilled(data))
    } catch (e) {
        dispatch(setError(e.message))
    }
}

export const createRecipe = (payload) => async (dispatch) => {
    try {
        console.log(payload)
        const response = await fetch('http://localhost:8000/recipes/', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        if (!response.ok) {
            console.log(data.message)
        }
        dispatch(addRecipe(data))
    } catch (e) {
        dispatch(setError(e.message))
    }
}
export const modalReducer = (state=false, action) => {
    switch (action.type) {
        case 'modal/showModal': {
            return !state
        }
        default:
            return state
    }
}

export const recipeReducer = (state = [], action) => {
    switch (action.type) {
        case 'recipe/add': {
            return [...state, action.payload]
        }
        case 'recipe/get': {
            return state
        }

        case 'recipe/fulfilled': {
            return action.payload
        }
        default:
            return state
    }
}