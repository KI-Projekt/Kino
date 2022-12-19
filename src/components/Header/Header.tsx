import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link, Box, Toolbar } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import CinetastischHorizontal from '../../img/Cinetastisch_horizontal.png';
import SearchBar from './SearchBar';
import SideMenu from './SideMenu';
import SideMenuButton from './SideMenuButton';
import ProfileMenuButton from './ProfileMenuButton';

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean,
  handleMenuOpen: Function,
  handleMenuClose: Function,
}

export const drawerWidth = '15rem';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.down('sm')]: {
    zIndex: theme.zIndex.drawer - 1,
},
  ...(open && {
    width: `calc(100% - ${drawerWidth})`,
    marginLeft: `${drawerWidth}`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      zIndex: theme.zIndex.drawer - 1,
  },
  }),
}));

function Header(props: AppBarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        open={props.open}
        handleMenuClose={props.handleMenuClose}
        handleMenuOpen={props.handleMenuOpen}
      >
        <Toolbar>
          <SideMenuButton open={props.open} handleMenuOpen={props.handleMenuOpen} handleMenuClose={props.handleMenuClose} />
          <Link href={`/`} underline='none'>
            <Box
              component="img"
              sx={{
                height: '3rem',
                position: 'absolute',
                zIndex: 1,
                top: '0.5rem',
                left: 0,
                right: 0,
                margin: '0 auto',
              }}
              alt="logo"
              src={CinetastischHorizontal}
            />
          </Link>
          <SearchBar />
          <Box sx={{ flexGrow: 1 }} />
          <ProfileMenuButton />
        </Toolbar>
      </AppBar>
      <SideMenu open={props.open} handleMenuOpen={props.handleMenuOpen} handleMenuClose={props.handleMenuClose} />
    </Box >
  );
}

export default Header;