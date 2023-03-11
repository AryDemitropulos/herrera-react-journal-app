import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks';
import { ImageGallery } from '../components';

export const NoteView = ({ note }) => {
  const dispatch = useDispatch();
  const { body, title, date, onInputChange, formState } = useForm(note);
  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  });

  const onClickSave = () => {
    dispatch();
  };
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
        <Button onClick={onClickSave} color='primary' sx={{ p: 2 }}>
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
      <ImageGallery />
    </Grid>
  );
};
