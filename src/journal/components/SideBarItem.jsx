import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';

export const SideBarItem = ({ note }) => {
  const { title, body } = note;
  const dispatch = useDispatch();

  const setActive = () => {
    dispatch(setActiveNote(note));
  };

  const newTitle = useMemo(() => {
    if (!title) return 'Untitled';
    if (title.length > 17) return title.substring(0, 17) + '...';
    return title;
  }, [title]);

  const newBody = useMemo(() => {
    if (!body) return 'Empty';
    if (body.length > 17) return body.substring(0, 17) + '...';
    return body;
  }, [body]);

  return (
    <ListItem disablePadding onClick={setActive}>
      <ListItemButton>
        <ListItemButton>
          <TurnedInNot />
        </ListItemButton>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={newBody} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
