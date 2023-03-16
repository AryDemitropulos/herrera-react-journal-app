import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null,
};
export const journalSlice = createSlice({
  name: 'journal',
  initialState: initialState,
  reducers: {
    setSavingNote: (state, action) => {
      state.isSaving = !!action.payload;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = { imageUrls: [], ...action.payload };
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    updateNote: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
      state.messageSaved = `${action.payload.title}, actualizada correctamente`;
    },
    deleteNoteById: (state, action) => {
      state.active = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    setMessageSaved: (state, action) => {
      state.messageSaved = action.payload;
    },
    clearMessageSaved: (state) => {
      state.messageSaved = '';
    },
    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
    },
    resetJournalStore: () => initialState,
  },
});
// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  clearMessageSaved,
  deleteNoteById,
  resetJournalStore,
  setActiveNote,
  setMessageSaved,
  setNotes,
  setPhotosToActiveNote,
  setSavingNote,
  updateNote,
} = journalSlice.actions;
