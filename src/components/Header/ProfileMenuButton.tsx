import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import Login from '../Login/LoginPopUp';
import { useNavigate } from "react-router";
import { User } from "../../interfaces/Interfaces";
import '../../App.css'

interface ProfileMenuButtonProps {
    user?: User;
    setUser: Function;
    setPersonalDataFilled: Function;
    isAdmin: boolean;
    setIsAdmin: Function;
}


function ProfileMenuButton(props: ProfileMenuButtonProps) {
    const profileMenuId = 'primary-search-account-profile-menu';

    const [anchorElProfile, setAnchorElProfile] = React.useState<null | HTMLElement>(null);

    const isProfileMenuOpen = Boolean(anchorElProfile);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorElProfile(null);
    };

    function createUserMenuData(
        label: string,
        link: string,
        onlyUser: boolean,
    ) {
        return { label, link, onlyUser }
    }

    const userMenuData = [
        createUserMenuData('My Profile', `profile/${props.user?.id}`, false),
        createUserMenuData('My Orders', `profile/${props.user?.id}/myOrders`, true),
        createUserMenuData("Logout", '', false),
    ];

    const navigate = useNavigate();

    const handleListItemClick = async (
        label: string,
        link: string,
    ) => {
        handleProfileMenuClose();
        if (label === "Logout") {
            await new Promise(f => setTimeout(f, 1000));
            props.setUser(undefined);
            props.setPersonalDataFilled(false);
            props.setIsAdmin({isAdmin: false});
        } else {
            navigate(`/${link}`);
        }
    };


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
            {!props.user &&
                <Box
                    sx={{
                        width: '20rem',
                        height: '20rem',
                    }}>
                    <Login setUser={props.setUser} handleProfileMenuClose={handleProfileMenuClose} />
                </Box>
            }
            {props.user && 
                <Box sx={{ backgroundColor: 'white', }}>
                    {userMenuData.map((setting) => (
                        <>
                            {(!props.isAdmin === setting.onlyUser || !props.isAdmin )&&
                                <MenuItem key={setting.label} onClick={() => handleListItemClick(setting.label, setting.link)}>
                                    <Typography textAlign="center">{setting.label}</Typography>
                                </MenuItem>
                            }
                        </>
                    ))}
                </Box>
            }
        </Menu>
    );

    return (
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
            {renderProfile}
        </Box>
    );
};

export default ProfileMenuButton