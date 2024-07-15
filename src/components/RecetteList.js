import React, { useState, useEffect } from 'react';
import { getRecettes, deleteRecette } from '../services/api';

const RecetteList = ({ selectRecette }) => {
    const [recettes, setRecettes] = useState([]);

    useEffect(() => {
        fetchRecettes();
    }, []);

    const fetchRecettes = async () => {
        try {
            const response = await getRecettes();
            setRecettes(response.data);
        } catch (error) {
            console.error("Failed to fetch recettes:", error);
            setRecettes([]);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteRecette(id);
            fetchRecettes();
        } catch (error) {
            console.error("Failed to delete recette:", error);
        }
    };

    return (
        <div>
            <h2>Recettes</h2>
            <ul>
                {recettes.map((recette) => (
                    <li key={recette.id}>
                        {recette.titre}
                        <button onClick={() => selectRecette(recette)}>Edit</button>
                        <button onClick={() => handleDelete(recette.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecetteList;
