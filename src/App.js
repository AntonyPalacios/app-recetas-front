import HomePage from "./pages/HomePage";
import {Link, Route, Routes} from "react-router-dom";
import RecipePage from "./pages/RecipePage";
import logo from "./assets/logo.png";
import QueryBar from "./components/QueryBar";
import {useEffect} from "react";
import {getRecipes, modalState} from "./features/recipes";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "./features/ingredients";
import RecipeModal from "./components/RecipeModal";

function App() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getRecipes())
        dispatch(getIngredients())
    },[dispatch])
    const modal = useSelector(modalState)
    return (
        <div className="container">
            <RecipeModal show={modal.isModalOpen} action={modal.type}/>
            <div className="text-center my-2">
                <Link to="/">
                    <img src={logo} alt="Logo" className="img-fluid"/>
                </Link>
            </div>
            <QueryBar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/recipes">
                    {/*<Route index element={<HomePage/>}/>*/}
                    <Route path=":recipeId" element={<RecipePage/>}/>
                </Route>
                <Route path="*" element={<h1>No encontrado uu</h1>}/>
            </Routes>
        </div>

    )
}

export default App;
