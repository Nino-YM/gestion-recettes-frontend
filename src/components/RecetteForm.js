import React, { useState, useEffect } from 'react';
import { addRecette, updateRecette } from '../services/api';

const RecetteForm = ({ selectedRecette, clearSelection, onRecetteAdded, onRecetteUpdated }) => {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (selectedRecette) {
            setTitre(selectedRecette.titre);
            setDescription(selectedRecette.description);
        } else {
            setTitre('');
            setDescription('');
        }
    }, [selectedRecette]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedRecette) {
                const response = await updateRecette(selectedRecette.id, { titre, description });
                onRecetteUpdated(response.data);
            } else {
                const response = await addRecette({ titre, description });
                onRecetteAdded(response.data);
            }
            clearSelection();
        } catch (error) {
            console.error("Error saving recette:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{selectedRecette ? 'Edit Recette' : 'Add Recette'}</h2>
            <div>
                <label>Titre</label>
                <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} required />
            </div>
            <div>
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={clearSelection}>Cancel</button>
        </form>
    );
};

export default RecetteForm;
