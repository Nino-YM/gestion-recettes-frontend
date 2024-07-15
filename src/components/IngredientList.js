import React, { useEffect } from 'react';
import { deleteIngredient } from '../services/api';
import './RecetteList.css'; // Assuming RecetteList.css styles can be shared

const IngredientList = ({ recetteId, ingredients, selectIngredient, fetchIngredients }) => {
    useEffect(() => {
        fetchIngredients(recetteId);
    }, [recetteId]);

    const handleDelete = async (ingredientId) => {
        try {
            await deleteIngredient(ingredientId);
            fetchIngredients(recetteId);
        } catch (error) {
            console.error("Failed to delete ingredient:", error);
        }
    };

    const handleCardClick = (ingredient) => {
        selectIngredient(ingredient);
    };

    return (
        <div className="ingredient-list">
            <h2>Ingredients</h2>
            <div className="card-container">
                {ingredients.length > 0 ? (
                    ingredients.map((ingredient) => (
                        <div key={ingredient.id} className="card" onClick={() => handleCardClick(ingredient)}>
                            <h3>{ingredient.nom}</h3>
                            <div className="card-buttons">
                                <button onClick={(e) => { e.stopPropagation(); selectIngredient(ingredient); }}>Edit</button>
                                <button onClick={(e) => { e.stopPropagation(); handleDelete(ingredient.id); }}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No ingredients found.</p>
                )}
            </div>
        </div>
    );
};

export default IngredientList;
