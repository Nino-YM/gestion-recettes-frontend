import React, { useState } from 'react';
import RecetteList from './components/RecetteList';
import RecetteForm from './components/RecetteForm';
import IngredientList from './components/IngredientList';
import IngredientForm from './components/IngredientForm';
import './App.css';

const App = () => {
  const [selectedRecette, setSelectedRecette] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const selectRecette = (recette) => {
    setSelectedRecette(recette);
    setSelectedIngredient(null);
  };

  const selectIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const clearSelection = () => {
    setSelectedRecette(null);
    setSelectedIngredient(null);
  };

  return (
    <div className="container">
      <h1>Gestion de Recettes</h1>
      <RecetteList selectRecette={selectRecette} />
      <RecetteForm selectedRecette={selectedRecette} clearSelection={clearSelection} />
      {selectedRecette && (
        <>
          <IngredientList recetteId={selectedRecette.id} selectIngredient={selectIngredient} />
          <IngredientForm recetteId={selectedRecette.id} selectedIngredient={selectedIngredient} clearSelection={clearSelection} />
        </>
      )}
    </div>
  );
};

export default App;
