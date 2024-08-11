import RecipeForm from "./RecipeForm";

const RecipeModal = ({show}) => {
    return (
        <div className={`modal fade ${show ? 'show' : ''}`}
             style={{display: show ? 'block' : 'none'}}
             id="recipeModal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Crear Receta</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <RecipeForm/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeModal