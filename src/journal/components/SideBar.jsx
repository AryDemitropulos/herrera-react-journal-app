import { TurnedInNot } from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

export const SideBar = ({ drawerWith = 240 }) => {
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
          {['Enero', 'Febrero', 'Marzo', 'Abril'].map((month) => (
            <ListItem key={month} disablePadding>
              <ListItemButton>
                <ListItemButton>
                  <TurnedInNot />
                </ListItemButton>
                <Grid container>
                  <ListItemText primary={month} />
                  <ListItemText
                    secondary={'Blanditiis, dignissimos, facilis '}
                  />
                </Grid>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
