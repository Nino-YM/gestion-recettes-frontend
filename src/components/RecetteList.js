import React, { useEffect } from 'react';
import { getRecettes, deleteRecette } from '../services/api';
import './RecetteList.css';

const RecetteList = ({ selectRecette, recettes, setRecettes }) => {
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
            setRecettes((prevRecettes) => prevRecettes.filter(recette => recette.id !== id));
        } catch (error) {
            console.error("Failed to delete recette:", error);
        }
    };

    const handleCardClick = (recette) => {
        selectRecette(recette);
    };

    return (
        <div className="recette-list">
            <h2>Recettes</h2>
            <div className="card-container">
                {recettes.map((recette) => (
                    <div key={recette.id} className="card" onClick={() => handleCardClick(recette)}>
                        <h3>{recette.titre}</h3>
                        <p>{recette.description}</p>
                        <div className="card-buttons">
                            <button onClick={(e) => { e.stopPropagation(); selectRecette(recette); }}>Edit</button>
                            <button onClick={(e) => { e.stopPropagation(); handleDelete(recette.id); }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecetteList;
