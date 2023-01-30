import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Page, move } from 'src/redux/reducers/page/page.slice';
import { useDispatch } from 'react-redux';
import WalletButton from '../atoms/WalletButton';

export type MobileMenuProps = {
  open: boolean;
  setOpen: (bool: boolean) => void;
};

const MobileMenu: React.FC<MobileMenuProps> = (props) => {
  const dispatch = useDispatch();
  const { open, setOpen } = props;

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setOpen(open);
    };
  return (
    <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{ width: '250px' }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List disablePadding>
          <ListItem disablePadding>
            <WalletButton menu />
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={() => dispatch(move(Page.COLLECTIONS))}>
              <Typography
                fontFamily="GlacialIndifference-Regular"
                color="primary"
                textAlign="center"
                align="center"
              >
                {'Collections'}
              </Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => dispatch(move(Page.ATLIER))}>
              <Typography
                fontFamily="GlacialIndifference-Regular"
                color="primary"
                textAlign="center"
                align="center"
              >
                {'Atelier'}
              </Typography>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                window.open('https://www.joyfa.io/');
              }}
            >
              <Typography
                fontFamily="GlacialIndifference-Regular"
                color="primary"
                textAlign="center"
                align="center"
              >
                {'Leave'}
              </Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileMenu;
