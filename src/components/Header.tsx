import * as React from 'react';
import { styled, alpha, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Divider, Link, Menu, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Box, Toolbar, Typography, InputBase } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import PaidIcon from '@mui/icons-material/Paid';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import MovieIcon from '@mui/icons-material/Movie';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Login from './Login/LoginPopUp';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import CinetastischHorizontal from '../img/Cinetastisch_horizontal.png';
import { useNavigate } from 'react-router-dom';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean,
  handleMenuOpen: Function,
  handleMenuClose: Function,
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

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: theme.palette.primary.main,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: theme.palette.primary.main,
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function Header(props: AppBarProps) {
  const [anchorElProfile, setAnchorElProfile] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const theme = useTheme();

  const isProfileMenuOpen = Boolean(anchorElProfile);

  function createMenuData(
    index: number,
    label: String,
    link: String,
    icon: JSX.Element,
  ) {
    return { index, label, link, icon }
  }

  const menuData = [
    createMenuData(1, 'Movies', '', <MovieIcon />),
    createMenuData(2, 'Shows', 'shows', <SlideshowIcon />),
    createMenuData(3, 'Opening hours', 'openingHours', <AccessTimeIcon />),
    createMenuData(4, 'Ticket prices', 'ticketPrices', <PaidIcon />),
  ];

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorElProfile(null);
  };

  const navigate = useNavigate();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    label: String,
    link: String,
    index: number,
  ) => {
    setSelectedIndex(index);
    navigate(`/${link}`)
    props.handleMenuClose();
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
      variant="permanent"
      anchor="left"
      open={props.open}
    >
      <DrawerHeader>
        <Typography
          variant="h5"
          align='left'
          sx={{ color: theme.palette.primary.contrastText }}
        >
          Navigation
        </Typography>
        <IconButton onClick={() => props.handleMenuClose()} sx={{ color: theme.palette.primary.contrastText }}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List >
        {menuData.map((item) => (
          <ListItem key={item.index} disablePadding>
            <ListItemButton
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#f04265",
                },
              }}
              selected={selectedIndex === item.index}
              onClick={(event) => handleListItemClick(event, item.label, item.link, item.index)}
            >
              <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText sx={{ color: theme.palette.primary.contrastText }} primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={props.open} handleMenuClose={props.handleMenuClose} handleMenuOpen={props.handleMenuOpen}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open menu"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={() => props.handleMenuOpen()}
            sx={{ mr: 2, ...(props.open && { display: 'none' }) }}
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
          <Box sx={{ display: { md: 'flex' } }}>
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