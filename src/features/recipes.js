

export const selectRecipes = state => {
    const {recipes} = state
    return recipes
}

const initialState = {
    recipes:[{
        id:1,
        title:'Arroz con Pollo',
        image: '../assets/arrozPollo.jpeg',
        description: 'Este es un plato que va muy bien con Huancaina'
    },{
        id:2,
        title:'Aji de Pollo',
        image: '../assets/ajiPollo.jpeg',
        description: 'Este es un plato que va muy bien con Huancaina'
    },{
        id:3,
        title:'Cau Cau',
        image: null,
        description: 'Este es un plato que va muy bien con Huancaina'
    },{
        id:4,
        title:'Frejoles con Seco',
        image: null,
        description: 'Este es un plato que va muy bien con Huancaina'
    },{
        id:5,
        title:'Carapulcra',
        image: '../assets/carapulcra.jpeg',
        description: 'Este es un plato que va muy bien con Huancaina'
    }]
}

export const reducer = (state=initialState, action) =>{
    switch (action.type){
        case 'recipe/add':{
            return{
                ...state
            }
        }
        case 'recipe/get':{
            return state
        }
        default:
            return state
    }
}