import TheContainer from "./ui/TheContainer";

const verifyLastColumn = (x, index, cont) => {
    if(index === cont-1){
        return (
            <div className="col" key={x.ingredient.ingredientId}>
                <p className="my-2"><span className="fw-bold">{x.quantity} {x.unit}</span> {x.ingredient.name}</p>
            </div>
        )
    }
    return (
        <div className="col border-bottom" key={x.ingredient.ingredientId}>
            <p className="my-2"><span className="fw-bold">{x.quantity} {x.unit}</span> {x.ingredient.name}</p>
        </div>
    )
}

const Ingredients = ({ingredients}) => {
    return (
        <TheContainer>
            <div className="col rounded-3">
                <h4>Ingredientes</h4>
            </div>
            <div className="col">
                <div className="row row-cols-2">
                    <p className="col-4 col-sm-3">1 hora</p>
                    <p className="col-4 col-sm-3">6 raciones</p>
                </div>
            </div>
            {ingredients.map((x, index) => verifyLastColumn(x, index, ingredients.length))}
        </TheContainer>
    )
}

export default Ingredients
