import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { RecipeData } from '../types/recipe';

interface RecipeStoreState {
  recipes: Record<string, RecipeData>;
}

interface RecipeStoreActions {
  addRecipe: (recipe: RecipeData) => void;
  updateRecipe: (id: string, recipe: RecipeData) => void;
  removeRecipe: (id: string) => void;
  setRecipes: (recipes: Record<string, RecipeData>) => void;
  clearAll: () => void;
}

export type RecipeStore = RecipeStoreState & RecipeStoreActions;

export const useRecipeStore = create<RecipeStore>()(
  persist(
    immer((set) => ({
      recipes: {},

      addRecipe: (recipe) =>
        set((state) => {
          state.recipes[recipe.id] = recipe;
        }),

      updateRecipe: (id, recipe) =>
        set((state) => {
          state.recipes[id] = recipe;
        }),

      removeRecipe: (id) =>
        set((state) => {
          delete state.recipes[id];
        }),

      setRecipes: (recipes) =>
        set((state) => {
          state.recipes = recipes;
        }),

      clearAll: () =>
        set((state) => {
          state.recipes = {};
        }),
    })),
    {
      name: 'researchcube-recipe-store',
    }
  )
);
