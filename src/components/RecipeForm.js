import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {useRef} from "react";
import TheButton from "./ui/TheButton";
import {createRecipe} from "../features/recipes";

const RecipeForm = () => {
    const imageRef = useRef(null);
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            image: null
        },
        onSubmit: (values, {resetForm}) => {
            console.log(values)
            dispatch(createRecipe(values))
            resetForm()
            if (imageRef.current) {
                imageRef.current.value = null;
            }
        },
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="recipeTitle" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="recipeTitle"
                       placeholder="Estofado de Pollo"
                       {...formik.getFieldProps('title')}/>
            </div>
            <div className="mb-3">
                <label htmlFor="recipeDescription" className="form-label">Descripción</label>
                <textarea rows="3" className="form-control" id="recipeDescription"
                          {...formik.getFieldProps('description')}/>
            </div>
            <div className="mb-3">
                <label htmlFor="recipeImage" className="form-label">Imagen</label>
                <input type="file"
                       name="image"
                       className="form-control" id="recipeImage"
                       ref={imageRef}
                       onChange={(event) => {
                           formik.setFieldValue('image', event.currentTarget.files[0]);
                       }}/>
            </div>
            <TheButton className="btn-primary float-end" data-bs-dismiss="modal" type="submit">Crear</TheButton>
        </form>
    )
}

export default RecipeForm