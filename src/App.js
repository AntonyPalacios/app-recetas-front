import logo from './assets/logo.png'
import QueryBar from "./components/QueryBar";
import Card from "./components/Card";
import {selectRecipes, isModalOpen} from "./features/recipes";
import {useSelector, useDispatch} from "react-redux";
import RecipeModal from "./components/RecipeModal";

function App() {
    const recipes = useSelector(selectRecipes)
    const show = useSelector(isModalOpen)
    const dispatch = useDispatch()

    return (
        <div className="container">
            <div className="text-center my-2">
                <img src={logo} alt="Logo" className="img-fluid"/>
            </div>
            <QueryBar/>
            <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2 g-3">
                {recipes.map(x => <Card key={x.id} recipe={x}/>)}
            </div>
            <div className="row">
                <div className="col">
                    <button className="btn col-3 col-md-2 col-lg-1 btn-primary float-end"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#recipeModal"
                            onClick={() => dispatch({type: 'modal/showModal'})}
                    >Add
                    </button>
                    <RecipeModal show={show}/>
                </div>
            </div>
        </div>
    );
}

export default App;
