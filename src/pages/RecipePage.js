import imagePlaceholder from '../assets/imagePlaceholder.png'
import Ingredients from "../components/Ingredients";
import TheContainer from "../components/ui/TheContainer";
import TheButton from "../components/ui/TheButton";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentRecipe, showModal} from "../features/recipes";

const RecipePage = () => {
    const dispatch = useDispatch()
    const recipe = useSelector(selectCurrentRecipe)

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-6 mx-auto">
                    <img src={imagePlaceholder} alt={recipe.title} className="img-thumbnail"/>
                </div>
            </div>
            <TheContainer>
                <div className="col">
                    <h2>{recipe.title}</h2>
                    <p>{recipe.description}</p>
                </div>
            </TheContainer>
            <Ingredients ingredients={recipe.ingredients}/>
            <div className="col">
                <TheButton className="btn col-3 btn-primary float-end"
                           type="button"
                           data-bs-toggle="modal"
                           data-bs-target="#recipeModal"
                           onClick={() => {dispatch(showModal('update')); }}
                >Modificar
                </TheButton>
            </div>
        </div>
    )
}

export default RecipePage