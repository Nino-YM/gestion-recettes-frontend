import React, { useEffect } from 'react';
import { deleteIngredient } from '../services/api';

const IngredientList = ({ recetteId, ingredients, selectIngredient, fetchIngredients }) => {
    useEffect(() => {
        fetchIngredients(recetteId);
    }, [recetteId, fetchIngredients]);

    const handleDelete = async (ingredientId) => {
        try {
            await deleteIngredient(ingredientId);
            fetchIngredients(recetteId); // Update the ingredients list after deletion
        } catch (error) {
            console.error("Failed to delete ingredient:", error);
        }
    };

    return (
        <div>
            <h2>Ingredients</h2>
            <ul>
                {ingredients.length > 0 ? (
                    ingredients.map((ingredient) => (
                        <li key={ingredient.id}>
                            {ingredient.nom}
                            <button onClick={() => selectIngredient(ingredient)}>Edit</button>
                            <button onClick={() => handleDelete(ingredient.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <li>No ingredients found.</li>
                )}
            </ul>
        </div>
    );
};

export default IngredientList;
