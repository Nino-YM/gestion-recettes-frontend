import React, { useState } from 'react';
import RecetteList from './components/RecetteList';
import RecetteForm from './components/RecetteForm';
import IngredientList from './components/IngredientList';
import IngredientForm from './components/IngredientForm';
import { getIngredients } from './services/api';
import './App.css';

const App = () => {
  const [selectedRecette, setSelectedRecette] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [recettes, setRecettes] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const selectRecette = (recette) => {
    setSelectedRecette(recette);
    setSelectedIngredient(null);
    fetchIngredients(recette.id);
  };

  const selectIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const clearIngredientSelection = () => {
    setSelectedIngredient(null);
  };

  const clearRecetteSelection = () => {
    setSelectedRecette(null);
    setSelectedIngredient(null);
    setIngredients([]);
  };

  const handleRecetteAdded = (newRecette) => {
    setRecettes((prevRecettes) => [...prevRecettes, newRecette]);
  };

  const handleRecetteUpdated = (updatedRecette) => {
    setRecettes((prevRecettes) =>
      prevRecettes.map((recette) =>
        recette.id === updatedRecette.id ? updatedRecette : recette
      )
    );
  };

  const handleIngredientAddedOrUpdated = (newOrUpdatedIngredient) => {
    setIngredients((prevIngredients) => {
      const existingIngredient = prevIngredients.find(ingredient => ingredient.id === newOrUpdatedIngredient.id);
      if (existingIngredient) {
        return prevIngredients.map(ingredient =>
          ingredient.id === newOrUpdatedIngredient.id ? newOrUpdatedIngredient : ingredient
        );
      } else {
        return [...prevIngredients, newOrUpdatedIngredient];
      }
    });
  };

  const fetchIngredients = async (recetteId) => {
    try {
      const response = await getIngredients(recetteId);
      setIngredients(response.data);
    } catch (error) {
      console.error("Failed to fetch ingredients:", error);
    }
  };

  return (
    <div>
      <header>Gestion de Recettes</header>
      <div className="container">
        <RecetteList selectRecette={selectRecette} recettes={recettes} setRecettes={setRecettes} />
        <div className="recette-form">
          <RecetteForm
            selectedRecette={selectedRecette}
            clearSelection={clearRecetteSelection}
            onRecetteAdded={handleRecetteAdded}
            onRecetteUpdated={handleRecetteUpdated}
          />
        </div>
        {selectedRecette && (
          <div className="ingredient-section">
            <h2>Ingredients for {selectedRecette.titre}</h2>
            <IngredientList
              recetteId={selectedRecette.id}
              ingredients={ingredients}
              selectIngredient={selectIngredient}
              fetchIngredients={fetchIngredients}
            />
            <div className="ingredient-form">
              <IngredientForm
                recetteId={selectedRecette.id}
                selectedIngredient={selectedIngredient}
                clearIngredientSelection={clearIngredientSelection}
                onIngredientAddedOrUpdated={handleIngredientAddedOrUpdated}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
