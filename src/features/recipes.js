export const selectRecipes = state => {
    const {recipes: {entities}} = state
    return entities
}

export const isModalOpen = state => state.recipes.isModalOpen

const initialState = {
    recipes: {
        entities: [{
            id: 1,
            title: 'Arroz con Pollo',
            image: '../assets/arrozPollo.jpeg',
            description: 'Este es un plato que va muy bien con Huancaina'
        }, {
            id: 2,
            title: 'Aji de Pollo',
            image: '../assets/ajiPollo.jpeg',
            description: 'Este es un plato que va muy bien con Huancaina'
        }, {
            id: 3,
            title: 'Cau Cau',
            image: '../assets/ajiPollo.jpeg',
            description: 'Este es un plato que va muy bien con Huancaina'
        }, {
            id: 4,
            title: 'Frejoles con Seco',
            image: '../assets/ajiPollo.jpeg',
            description: 'Este es un plato que va muy bien con Huancaina'
        }, {
            id: 5,
            title: 'Carapulcra',
            image: '../assets/carapulcra.jpeg',
            description: 'Este es un plato que va muy bien con Huancaina'
        }],
        isModalOpen: false
    }
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'recipe/add': {
            return {
                ...state,
                recipes: {
                    ...state.recipes,
                    entities: [...state.recipes.entities, action.payload]
                }
            }
        }
        case 'recipe/get': {
            return state
        }
        case 'modal/showModal': {
            return {
                ...state,
                recipes: {
                    ...state.recipes,
                    isModalOpen: !state.recipes.isModalOpen
                }
            }
        }
        default:
            return state
    }
}