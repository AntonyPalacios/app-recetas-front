import {useDispatch, useSelector} from "react-redux";
import {isModalOpen, selectRecipes} from "../features/recipes";
import Card from "../components/Card";
import TheButton from "../components/ui/TheButton";
import RecipeModal from "../components/RecipeModal";

const HomePage = () =>{
    const recipes = useSelector(selectRecipes)
    const show = useSelector(isModalOpen)
    const dispatch = useDispatch()

    return (
        <div className="container">
            <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2 g-3">
                {recipes.map(x => <Card key={x.recipeId} recipe={x}/>)}
            </div>
            <div className="row">
                <div className="col">
                    <TheButton className="btn col-3 btn-primary float-end"
                               type="button"
                               data-bs-toggle="modal"
                               data-bs-target="#recipeModal"
                               onClick={() => dispatch({type: 'modal/showModal'})}
                    >Add
                    </TheButton>
                    <RecipeModal show={show}/>
                </div>
            </div>
        </div>
    );
}

export default HomePage