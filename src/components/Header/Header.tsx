import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link, Box, Toolbar, Button } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import CinetastischHorizontal from '../../img/Cinetastisch_horizontal.png';
import CinetastischIcon from '../../img/Cinetastisch_icon.png';
import SideMenu from './SideMenu';
import SideMenuButton from './SideMenuButton';
import ProfileMenuButton from './ProfileMenuButton';
import { User } from '../../interfaces/Interfaces';
import { Navigate, useNavigate } from 'react-router-dom';

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  handleMenuOpen: Function;
  handleMenuClose: Function;
}

interface HeaderProps {
  user?: User;
  setUser: Function;
  setPersonalDataFilled: Function;
  isAdmin: boolean;
  setIsAdmin: Function;
  appBarProps: AppBarProps;
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

function Header(props: HeaderProps) {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        open={props.appBarProps.open}
        handleMenuClose={props.appBarProps.handleMenuClose}
        handleMenuOpen={props.appBarProps.handleMenuOpen}
      >
        <Toolbar>
          <SideMenuButton open={props.appBarProps.open} handleMenuOpen={props.appBarProps.handleMenuOpen} handleMenuClose={props.appBarProps.handleMenuClose} />
          <Link href={`/`} underline='none'>
            <Box
              component="img"
              sx={{
                content: {
                  xs: `url(${CinetastischIcon})`, //img src from xs up to sm
                  sm: `url(${CinetastischHorizontal})`,  //img src from sm and up
                },
                height: '3rem',
                position: 'absolute',
                zIndex: 1,
                top: {
                  xs: '0.2rem',
                  sm: '0.5rem',
                },
                left: 0,
                right: 0,
                margin: '0 auto',
              }}
              alt="Logo"
            />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {props.user?.aiAccepted === false && <Button variant='contained' onClick={()=>navigate("/reviews")}>Start with AI</Button>}
          
          <ProfileMenuButton
            user={props.user}
            setUser={props.setUser}
            setPersonalDataFilled={props.setPersonalDataFilled}
            isAdmin={props.isAdmin}
            setIsAdmin={props.setIsAdmin}
          />
          
        </Toolbar>
      </AppBar>
      <SideMenu appBarProps={props.appBarProps} isAdmin={props.isAdmin} />
    </Box >
  );
}

export default Header;