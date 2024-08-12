import imagePlaceholder from '../assets/imagePlaceholder.png'
import {Link} from "react-router-dom";

const reduceDescription = (description) => {
    if (description.length > 100) {
        return description.substring(0, 100).concat("...")
    }
    return description
}
const Card = ({recipe}) => {
    return (
        <div className="col">
            <div className="card p-2 h-100">
                <Link to={`/recipes/${recipe.id}`} state={recipe} >
                    <img src={imagePlaceholder} className="card-img-top" alt={recipe.title}/>
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{recipe.title}</h5>
                    <p className="card-text">{reduceDescription(recipe.description)}</p>
                </div>

                <div className="card-footer text-end">
                    FAV
                </div>
            </div>
        </div>
    )
}

export default Card