import {useLocation} from "react-router-dom";
import imagePlaceholder from '../assets/imagePlaceholder.png'
import Ingredients from "../components/Ingredients";
import TheContainer from "../components/ui/TheContainer";

const RecipePage = () => {
    const location = useLocation()
    const recipe = location.state;

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
            {/*<Ingredients ingredients={[{amount:500,measure:"gramos",name:"frejoles"},{amount:1,measure:"litro",name:"agua"}]}/>*/}
            <Ingredients ingredients={recipe.ingredients}/>


        </div>
    )
}

export default RecipePage