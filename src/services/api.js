import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export const getRecettes = () => api.get('/recettes');
export const addRecette = (recette) => api.post('/recettes', recette);
export const updateRecette = (id, recette) => api.put(`/recettes/${id}`, recette);
export const deleteRecette = (id) => api.delete(`/recettes/${id}`);

export const getIngredients = (recetteId) => api.get(`/recettes/${recetteId}/ingredients`);
export const addIngredient = (ingredient) => api.post('/ingredients', ingredient);
export const updateIngredient = (ingredientId, ingredient) => api.put(`/ingredients/${ingredientId}`, ingredient);
export const deleteIngredient = (ingredientId) => api.delete(`/ingredients/${ingredientId}`);
