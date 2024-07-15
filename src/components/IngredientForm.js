import React, { useState, useEffect } from 'react';
import { addIngredient, updateIngredient } from '../services/api';

const IngredientForm = ({ recetteId, selectedIngredient, clearSelection }) => {
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
                console.log(`Updating ingredient: ${selectedIngredient.id}, ${nom}`);
                await updateIngredient(selectedIngredient.id, { recette_id: recetteId, nom });
            } else {
                console.log(`Adding ingredient: ${recetteId}, ${nom}`);
                await addIngredient({ recette_id: recetteId, nom }); // Updated
            }
            clearSelection();
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
            <button type="button" onClick={clearSelection}>Cancel</button>
        </form>
    );
};

export default IngredientForm;
