import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers/journal';
import {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSavingNote,
} from './journalSlice';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSavingNote(true));
    const { uid } = getState().auth;
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);
    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};
