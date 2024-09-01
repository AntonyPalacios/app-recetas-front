import {asyncMac, mac, mat} from "./utils";


const asyncRecipes = mat('recipe') //make async types
const [setPending, setFulfilled, setError] = asyncMac(asyncRecipes)

export const selectRecipes = state => {
    const {recipes: {entities:recipes}} = state
    return recipes
}
export const selectRecipeToEdit = state => {
    const {recipes: {recipeToEdit}} = state
    return recipeToEdit
}

export const addRecipeAction = mac('recipe/add', 'payload')
export const updateRecipeAction = mac('recipe/update', 'payload')
export const setRecipeToEdit = mac('recipe/setRecipeToEdit','payload')
export const showModal = mac('modal/showModal','payload')
export const resetRecipeToEdit = mac('recipe/resetRecipeToEdit')

export const modalState = state => state.recipes.modal


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
        console.log(data)
        dispatch(addRecipeAction(data))

    } catch (e) {
        console.log(e.message)
    }finally {
        dispatch(showModal())
    }
}

export const updateRecipe = (payload) => async (dispatch) => {
    try {
        console.log(payload)
        const response = await fetch(`http://localhost:8000/recipes/${payload.recipeId}/`, {
            method: 'PUT',
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
        console.log(data)
        dispatch(updateRecipeAction(data))

    } catch (e) {
        console.log(e.message)
    }finally {
        dispatch(showModal('update'))
    }
}

export const modalReducer = (state={isModalOpen:false, type:'create'}, action) => {
    switch (action.type) {
        case 'modal/showModal': {
            return {
                isModalOpen: !state.isModalOpen,
                type: action.payload ? action.payload: 'create'
            }
        }
        default:
            return state
    }
}

const updateRecipeList = (state, payload) =>{
    const index = state.findIndex((recipe) =>{
        return recipe.recipeId === payload.recipeId;
    })
    if(index !== -1) {
        let newState = state
        newState[index] = payload
        return newState
    }else{
        return [...state,payload]

    }
}

export const recipeReducer = (state = [], action) => {
    switch (action.type) {
        case 'recipe/add': {
            return updateRecipeList(state, action.payload)
        }
        case 'recipe/update':{
            return updateRecipeList(state, action.payload)
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

export const recipeToEditReducer = (state=null,action) => {
    switch (action.type) {
        case 'recipe/setRecipeToEdit':{
            return action.payload
        }
        case 'recipe/resetRecipeToEdit':{
            return null
        }
        default:
            return state
    }
}