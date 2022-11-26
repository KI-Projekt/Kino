import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import PaidIcon from '@mui/icons-material/Paid';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import MovieIcon from '@mui/icons-material/Movie';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Login from './Login';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import CinetastischHorizontal from '../img/Cinetastisch_horizontal.png';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function Header() {
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElProfile, setAnchorElProfile] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const isProfileMenuOpen = Boolean(anchorElProfile);
  //const isMenuOpen = Boolean(anchorEl);

  //const navigate = useNavigate();

  const menuData = [
    { icon: <MovieIcon />, label: 'Movies', link: '' },
    { icon: <SlideshowIcon />, label: 'Shows', link: 'shows' },
    { icon: <AccessTimeIcon />, label: 'Opening hours', link: 'openingHours' },
    { icon: <PaidIcon />, label: 'Ticket prices', link: 'ticketPrices' },
  ];

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleMenuOpen = () => {
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  const handleProfileMenuClose = () => {
    setAnchorElProfile(null);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    label: string,
  ) => {
    // routing needs to be added here
    /* useNavigate(`/${label}`); */
    console.log(label);
  };


  const menuId = 'primary-search-account-menu';
  const profileMenuId = 'primary-search-account-profile-menu';
  const renderProfile = (
    <Menu
      anchorEl={anchorElProfile}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <Box
        sx={{
          width: '20rem',
          height: '20rem',
        }}>
        <Login></Login>
      </Box>
    </Menu>
  );

  const renderMenu = (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: theme.palette.primary.main,
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Typography
          variant="h5"
          align='left'
          sx={{ color: theme.palette.primary.contrastText }}
          >
          Navigation
        </Typography>
        <IconButton onClick={handleMenuClose} sx={{ color: theme.palette.primary.contrastText }}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List >
        {menuData.map((item) => (
          <Link href={`/${item.link}`} underline='none' >
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={(event) => handleListItemClick(event, item.label)} >
                <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText sx={{ color: theme.palette.primary.contrastText }} primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open menu"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleMenuOpen}
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { /* xs: 'none', */ md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={profileMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderProfile}
      {renderMenu}
    </Box >
  );
}

export default Header;