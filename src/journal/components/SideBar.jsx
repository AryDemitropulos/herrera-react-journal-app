import { TurnedInNot } from '@mui/icons-material';
import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';

export const SideBar = ({ drawerWith = 240 }) => {
  const { notes } = useSelector((store) => store.journal);
  const { displayName } = useSelector((store) => store.auth);

  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWith }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant='permanent'
        open
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWith,
          },
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes.map((note) => (
            <SideBarItem note={note} key={note.id} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
