import React, { useState, useEffect } from 'react';
import { addIngredient, updateIngredient } from '../services/api';

const IngredientForm = ({ recetteId, selectedIngredient, clearIngredientSelection, onIngredientAddedOrUpdated }) => {
    const [nom, setNom] = useState('');

    useEffect(() => {
        if (selectedIngredient) {
            setNom(selectedIngredient.nom);
        } else {
            setNom('');
        }
    }, [selectedIngredient]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedIngredient) {
                const response = await updateIngredient(selectedIngredient.id, { nom, recette_id: recetteId });
                onIngredientAddedOrUpdated(response.data);
            } else {
                const response = await addIngredient({ nom, recette_id: recetteId });
                onIngredientAddedOrUpdated(response.data);
            }
            clearIngredientSelection();
        } catch (error) {
            console.error("Error saving ingredient:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{selectedIngredient ? 'Edit Ingredient' : 'Add Ingredient'}</h2>
            <div>
                <label>Nom</label>
                <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={clearIngredientSelection}>Cancel</button>
        </form>
    );
};

export default IngredientForm;
