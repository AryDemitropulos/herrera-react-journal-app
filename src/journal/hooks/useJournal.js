import { useDispatch, useSelector } from 'react-redux';
import { clearMessageSaved as clearMessage } from '../../store/journal/journalSlice';
import {
  startDeletingActiveNote,
  startSavingNote,
  startUploadingFiles,
} from '../../store/journal/thunks';

export const useJournal = () => {
  const dispatch = useDispatch();
  const journalStore = useSelector((store) => store.journal);

  const formatDate = (date) => new Date(date).toUTCString();
  const saveNote = (note) => {
    dispatch(startSavingNote(note));
  };

  const clearMessageSaved = () => {
    dispatch(clearMessage());
  };

  const saveFiles = (files = []) => {
    dispatch(startUploadingFiles(files));
  };

  const deleteActiveNote = () => {
    dispatch(startDeletingActiveNote());
  };

  return {
    ...journalStore,
    saveNote,
    formatDate,
    clearMessageSaved,
    saveFiles,
    deleteActiveNote,
  };
};
