import { useEffect, useMemo, useRef } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';
import { useJournal } from '../hooks/useJournal';
import { useForm } from '../../hooks';

export const NoteView = ({ note }) => {
  const {
    saveNote,
    messageSaved,
    formatDate,
    clearMessageSaved,
    isSaving,
    saveFiles,
    deleteActiveNote,
  } = useJournal();
  const { body, title, date, onInputChange, formState } = useForm(note);
  const dateString = useMemo(() => formatDate(date), [date]);

  const fileInput = useRef();

  const onClickSave = () => {
    saveNote(formState);
  };

  const onInputFileChange = ({ target }) => {
    const { files } = target;
    if (files.length === 0) return;
    saveFiles(files);
  };
  const onDelete = () => {
    deleteActiveNote();
  };

  useEffect(() => {
    if (!messageSaved) return;
    Swal.fire('Nota actualizada', messageSaved, 'success');
    clearMessageSaved();
  }, [messageSaved]);

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      sx={{ mb: 1 }}
      alignItems='center'
      className='animate__animated animate__fadeIn animate__faster'
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          {dateString}
        </Typography>
      </Grid>

      <Grid item>
        <input
          ref={fileInput}
          type='file'
          multiple
          onChange={onInputFileChange}
          style={{ display: 'none' }}
        ></input>
        <IconButton
          disabled={isSaving}
          onClick={() => fileInput.current.click()}
          color='primary'
        >
          <UploadOutlined sx={{ fontSize: 30, mr: 1 }} />
        </IconButton>
        <Button
          disabled={isSaving}
          onClick={onClickSave}
          color='primary'
          sx={{ p: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          label='Titulo'
          placeholder='Ingrese un título'
          name='title'
          value={title}
          onChange={onInputChange}
          fullWidth
          sx={{ border: 'none', mb: 1 }}
          type='text'
          variant='filled'
        />

        <TextField
          label='Descripción'
          placeholder='Qué sucedio hoy?'
          name='body'
          value={body}
          onChange={onInputChange}
          fullWidth
          minRows={5}
          multiline
          sx={{ border: 'none', mb: 1 }}
          type='text'
          variant='filled'
        />
      </Grid>
      <Grid container justifyContent='end'>
        <Button onClick={onDelete} sx={{ mt: 2 }} color='error'>
          <DeleteOutline sx={{ fontSize: 30, mr: 1 }} /> Borrar
        </Button>
      </Grid>
      <ImageGallery images={note.imageUrls} />
    </Grid>
  );
};
