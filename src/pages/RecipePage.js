import {useLocation} from "react-router-dom";

const RecipePage = () => {
    const location = useLocation()
    const recipe = location.state;

    return (
        <div className="container">
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title}/>
            <p>{recipe.description}</p>
        </div>
    )
}

export default RecipePage