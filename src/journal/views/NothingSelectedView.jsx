import { StarOutline } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import React from 'react';

export const NothingSelectedView = () => {
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        minHeight: 'calc(100vh - 115px)',
        backgroundColor: 'primary.main',
        padding: 4,
      }}
    >
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: '100px', color: 'white' }}></StarOutline>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5' sx={{ mb: 1 }} color='white'>
          Selecciona o crea una entrada
        </Typography>
      </Grid>
    </Grid>
  );
};
