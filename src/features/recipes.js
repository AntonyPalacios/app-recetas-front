import {asyncMac, mac, mat, reduceReducers} from "./utils";


const asyncRecipes = mat('recipe') //make async types
const [setPending, setError] = asyncMac(asyncRecipes)

export const selectRecipes = state => {
    return state.recipes.entities.recipes
}

export const selectCurrentRecipe = state => {
    return state.recipes.entities.currentRecipe
}

export const addRecipeAction = mac('recipe/add', 'payload')
export const updateRecipeAction = mac('recipe/update', 'payload')
export const setCurrentRecipe = mac('recipe/setCurrentRecipe','payload')
export const showModal = mac('modal/showModal','payload')
export const resetCurrentRecipe = mac('recipe/resetCurrentRecipe')
export const setRecipes = mac('recipe/set','payload')

export const modalState = state => state.recipes.modal


export const getRecipes = () => async dispatch => {
    dispatch(setPending())
    try {
        const response = await fetch('http://localhost:8000/recipes/')
        const data = await response.json()
        dispatch(setRecipes(data))
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
        //dispatch(showModal('create'))
    }
}

export const updateRecipe = (payload) => async (dispatch) => {
    try {
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
        dispatch(setCurrentRecipe(payload))
    }
}

export const modalReducer = (state={isModalOpen:false, type:'create'}, action) => {
    switch (action.type) {
        case 'modal/showModal': {
            return {
                isModalOpen: !state.isModalOpen,
                type: action.payload? action.payload: ''
            }
        }
        default:
            return state
    }
}

const updateRecipeList = (state, payload) =>{
    const index = state.recipes.findIndex((recipe) =>{
        return recipe.recipeId === payload.recipeId;
    })
    if(index !== -1) {
        let newState = state
        newState.recipes[index] = payload
        return newState
    }else{
        return {
            ...state,
            recipes: [...state.recipes,payload]
        }

    }
}

const initialRecipeState = {
    recipes:[],
    currentRecipe:null
}

export const recipeCrudReducer = (state = initialRecipeState, action) => {
    switch (action.type) {
        case 'recipe/add': {
            return updateRecipeList(state, action.payload)
        }
        case 'recipe/update':{
            return updateRecipeList(state, action.payload)
        }
        case 'recipe/set': {
            return {
                ...state,
                recipes: action.payload
            }
        }

        case 'recipe/fulfilled': {
            return {
                ...state,
                recipes: action.payload
            }
        }
        default:
            return state
    }
}

export const currentRecipeReducer = (state,action) => {
    switch (action.type) {
        case 'recipe/setCurrentRecipe':{
            return {
                ...state,
                currentRecipe: action.payload
            }
        }
        case 'recipe/resetCurrentRecipe':{
            return {
                ...state,
                currentRecipe: null
            }
        }
        default:
            return state
    }
}

export const recipeReducer = reduceReducers(recipeCrudReducer, currentRecipeReducer)