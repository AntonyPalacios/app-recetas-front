import imagePlaceholder from '../assets/imagePlaceholder.png'

const Card = ({recipe}) => {
    return (
        <div className="col">
            <div className="card p-2">
                <img src={imagePlaceholder} className="card-img-top" alt="Comida"/>
                <div className="card-body">
                    <h5 className="card-title">{recipe.title}</h5>
                    <p className="card-text">{recipe.description}</p>
                </div>
                <div className="card-footer text-end">
                    FAV
                </div>
            </div>
        </div>
    )
}

export default Card