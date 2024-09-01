import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {setCurrentRecipe} from "../../features/recipes";

const TheReduxLink = ({ to, children, recipe, ...rest }) => {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        // Ejecutar la acción de Redux
        dispatch(setCurrentRecipe(recipe));
    };

    return (
        <Link to={to} onClick={handleClick} {...rest}>
            {children}
        </Link>
    );
};

export default TheReduxLink;