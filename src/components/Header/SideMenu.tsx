import React from "react";
import { styled, Theme, CSSObject, useTheme } from "@mui/material/styles";
import { Typography, IconButton, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import { useNavigate } from "react-router-dom";

import PaidIcon from '@mui/icons-material/Paid';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import MovieIcon from '@mui/icons-material/Movie';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AppBarProps, drawerWidth } from "./Header";

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

function SideMenu(props: AppBarProps) {

    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const theme = useTheme();

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

    return (
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
}

export default SideMenu;