import {FieldArray, FormikProvider, useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useRef} from "react";
import TheButton from "./ui/TheButton";
import {createRecipe, selectRecipeToEdit, updateRecipe} from "../features/recipes";
import {selectIngredients} from "../features/ingredients";

const RecipeForm = ({action}) => {
    const recipe = useSelector(selectRecipeToEdit)
    const initialValues= {
        title: recipe?.title || '',
            description: recipe?.description || '',
            image: null,
            ingredients: recipe?.ingredients.map(x => {
                return {
                    'ingredient':x.ingredient.ingredientId,
                    'quantity':x.quantity,
                    'unit':x.unit
                }}) || []
    }
    const imageRef = useRef(null);
    const ingredientsList = useSelector(selectIngredients)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: (values, {resetForm}) => {
            if(action==='create'){
                dispatch(createRecipe(values))
            }else{
                values.ingredients = values.ingredients.map(ingredientObj => {
                    const matchedIngredient = ingredientsList.find(item => item.ingredientId == ingredientObj.ingredient);
                    return {
                        ...ingredientObj,
                        ingredient: matchedIngredient || ingredientObj.ingredient // En caso no se encuentre coincidencia, se deja el valor original
                    };
                });
                values = {
                    ...values,
                    recipeId:recipe.recipeId
                }
                dispatch(updateRecipe(values))
            }
            resetForm()
            if (imageRef.current) {
                imageRef.current.value = null;
            }
        },
    })

    const setModalButtonText = (action) => {
        if(action==='create')
            return 'Crear'
        else if(action==='update')
            return 'Actualizar'
    };
    return (
        <FormikProvider value={formik}>
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
            <div className="mb-3">
                <FieldArray name="ingredients">
                    {({insert, remove, push}) => (
                        <div>
                            {formik.values.ingredients.length > 0 &&
                                formik.values.ingredients.map((ing, index) => (
                                    <div key={index} className="row row-cols-4 justify-content-between">
                                        <div className="col-5">
                                        <select
                                            className="form-select"
                                            id={`ingredients[${index}].ingredient`}
                                            name={`ingredients[${index}].ingredient`}
                                            value={ing.ingredient}
                                            onChange={formik.handleChange}

                                        >
                                            <option value="">Seleccione</option>
                                            {/*{ingredientsList.map((x) => <option value={JSON.stringify(x)} key={x.ingredientId}>{x.name}</option>)}*/}
                                            {ingredientsList.map((x) => <option value={x.ingredientId} key={x.ingredientId}>{x.name}</option>)}
                                        </select>
                                        </div>
                                        <div className="col-3">
                                        <input
                                            className="form-control"
                                            id={`ingredients[${index}].quantity`}
                                            name={`ingredients[${index}].quantity`}
                                            type="number"
                                            value={ing.quantity}
                                            onChange={formik.handleChange}
                                        />
                                        </div>
                                        <div className="col-3">
                                            <input
                                                className="form-control"
                                                id={`ingredients[${index}].unit`}
                                                name={`ingredients[${index}].unit`}
                                                type="text"
                                                value={ing.unit}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="col-1 align-content-center">
                                        <button type="button" className="btn btn-primary btn-sm" onClick={() => remove(index)}>-</button>
                                        </div>
                                    </div>
                                ))}
                            <button
                                type="button"
                                onClick={() => push({quantity:0,unit:''})}
                            >
                                Add Ingredient
                            </button>
                        </div>
                    )}
                </FieldArray>
            </div>
            <TheButton className="btn-primary float-end" data-bs-dismiss="modal" type="submit">{setModalButtonText(action)}</TheButton>
        </form>
        </FormikProvider>
    )
}

export default RecipeForm