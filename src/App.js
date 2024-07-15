import React, { useState } from 'react';
import RecetteList from './components/RecetteList';
import RecetteForm from './components/RecetteForm';
import IngredientList from './components/IngredientList';
import IngredientForm from './components/IngredientForm';
import './App.css';

const App = () => {
  const [selectedRecette, setSelectedRecette] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [recettes, setRecettes] = useState([]);

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

  return (
    <div className="container">
      <h1>Gestion de Recettes</h1>
      <RecetteList selectRecette={selectRecette} recettes={recettes} setRecettes={setRecettes} />
      <RecetteForm
        selectedRecette={selectedRecette}
        clearSelection={clearSelection}
        onRecetteAdded={handleRecetteAdded}
        onRecetteUpdated={handleRecetteUpdated}
      />
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
