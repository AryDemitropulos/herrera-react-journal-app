import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../src/firebase/config';
import {
  addNewEmptyNote,
  setActiveNote,
  setSavingNote,
} from '../../../src/store/journal/journalSlice';
import { startNewNote } from '../../../src/store/journal/thunks';

describe('Pruebas en Journal Thunks', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const uid = 'TEST_ID';

  console.log(process.env);
  beforeEach(() => jest.clearAllMocks());

  afterAll(async () => {
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const { docs } = await getDocs(collectionRef);
    await Promise.all(docs.map((doc) => deleteDoc(doc.ref)));
  }, 15000);

  test('startNewNote debe de crear una nota en blanco', async () => {
    getState.mockReturnValue({ auth: { uid } });
    await startNewNote()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(setSavingNote(true));
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
      })
    );
  });
});
