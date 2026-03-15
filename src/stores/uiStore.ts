import { create } from 'zustand';

interface UIStoreState {
  selectedNodeId: string | null;
  selectedRecipeId: string | null;
  editorPanel: 'research' | 'recipe' | 'none';
  validationDialogOpen: boolean;
  importDialogOpen: boolean;
  exportDialogOpen: boolean;
  confirmDialog: { open: boolean; title: string; message: string; onConfirm: (() => void) | null };
}

interface UIStoreActions {
  selectNode: (id: string | null) => void;
  selectRecipe: (id: string | null) => void;
  setEditorPanel: (panel: 'research' | 'recipe' | 'none') => void;
  openValidationDialog: () => void;
  closeValidationDialog: () => void;
  openImportDialog: () => void;
  closeImportDialog: () => void;
  openExportDialog: () => void;
  closeExportDialog: () => void;
  showConfirm: (title: string, message: string, onConfirm: () => void) => void;
  closeConfirm: () => void;
}

export type UIStore = UIStoreState & UIStoreActions;

export const useUIStore = create<UIStore>()((set) => ({
  selectedNodeId: null,
  selectedRecipeId: null,
  editorPanel: 'none',
  validationDialogOpen: false,
  importDialogOpen: false,
  exportDialogOpen: false,
  confirmDialog: { open: false, title: '', message: '', onConfirm: null },

  selectNode: (id) =>
    set({
      selectedNodeId: id,
      selectedRecipeId: null,
      editorPanel: id ? 'research' : 'none',
    }),

  selectRecipe: (id) =>
    set({
      selectedRecipeId: id,
      selectedNodeId: null,
      editorPanel: id ? 'recipe' : 'none',
    }),

  setEditorPanel: (panel) => set({ editorPanel: panel }),

  openValidationDialog: () => set({ validationDialogOpen: true }),
  closeValidationDialog: () => set({ validationDialogOpen: false }),

  openImportDialog: () => set({ importDialogOpen: true }),
  closeImportDialog: () => set({ importDialogOpen: false }),

  openExportDialog: () => set({ exportDialogOpen: true }),
  closeExportDialog: () => set({ exportDialogOpen: false }),

  showConfirm: (title, message, onConfirm) =>
    set({ confirmDialog: { open: true, title, message, onConfirm } }),
  closeConfirm: () =>
    set({ confirmDialog: { open: false, title: '', message: '', onConfirm: null } }),
}));
