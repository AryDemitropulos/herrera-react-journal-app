import { createSlice } from '@reduxjs/toolkit';
export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
  },
  reducers: {
    setSavingNote: (state, action) => {
      state.isSaving = !!action.payload;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {},
    updateNote: (state, action) => {},
    deleteNoteById: (state, action) => {},
  },
});
// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  deleteNoteById,
  setActiveNote,
  setNotes,
  setSaving,
  setSavingNote,
  updateNote,
} = journalSlice.actions;
