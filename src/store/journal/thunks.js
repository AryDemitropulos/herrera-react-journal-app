import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload, loadNotes } from '../../helpers/journal';
import {
  addNewEmptyNote,
  deleteNoteById,
  setActiveNote,
  setMessageSaved,
  setNotes,
  setPhotosToActiveNote,
  setSavingNote,
  updateNote,
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

export const startSavingNote = (note) => {
  return async (dispatch, getState) => {
    dispatch(setSavingNote(true));
    const { uid } = getState().auth;
    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });
    dispatch(updateNote(note));
    dispatch(setSavingNote(false));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSavingNote(true));
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }
    const photosUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote(photosUrls));
    dispatch(setSavingNote(false));
  };
};
export const startDeletingActiveNote = (files = []) => {
  return async (dispatch, getState) => {
    dispatch(setSavingNote(true));
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);
    
    dispatch(deleteNoteById(note.id));
    dispatch(setSavingNote(false));
  };
};
