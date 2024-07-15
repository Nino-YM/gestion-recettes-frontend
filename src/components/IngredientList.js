import React, { useState, useEffect } from 'react';
import { getIngredients, deleteIngredient } from '../services/api';

const IngredientList = ({ recetteId, selectIngredient }) => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        if (recetteId) {
            fetchIngredients(recetteId);
        }
    }, [recetteId]);

    const fetchIngredients = async (id) => {
        try {
            console.log(`Fetching ingredients for recette: ${id}`);
            const response = await getIngredients(id);
            console.log("Ingredients fetched: ", response.data);
            setIngredients(response.data);
        } catch (error) {
            console.error("Failed to fetch ingredients:", error);
        }
    };

    const handleDelete = async (ingredientId) => {
        try {
            await deleteIngredient(ingredientId);
            fetchIngredients(recetteId);
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
