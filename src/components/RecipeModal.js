import RecipeForm from "./RecipeForm";
import {showModal} from "../features/recipes";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

const RecipeModal = ({show,action}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const modalElement = document.getElementById('recipeModal');
        const handleHide = () => {
            // Ejecutar dispatch cuando el modal se oculta
            dispatch(showModal('update'));
        };

        // Añadir el evento al cerrar el modal
        modalElement.addEventListener('hidden.bs.modal', handleHide);

        return () => {
            // Limpiar el evento cuando el componente se desmonte
            modalElement.removeEventListener('hidden.bs.modal', handleHide);
        };
    }, [dispatch]);

    const setModalType = (action) => {
        if(action==='create')
            return 'Crear'
        else if(action==='update')
            return 'Actualizar'
    }

    return (
        <div className={`modal fade ${show ? 'show' : ''}`}
             style={{display: show ? 'block' : 'none'}}
             id="recipeModal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {setModalType(action)} Receta
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <RecipeForm action={action}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeModal