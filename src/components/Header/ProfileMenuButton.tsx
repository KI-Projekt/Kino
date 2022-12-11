import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton, Menu } from "@mui/material";
import React from "react";
import Login from '../Login/LoginPopUp';

function ProfileMenuButton() {
    const profileMenuId = 'primary-search-account-profile-menu';

    const [anchorElProfile, setAnchorElProfile] = React.useState<null | HTMLElement>(null);

    const isProfileMenuOpen = Boolean(anchorElProfile);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorElProfile(null);
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
            <Box
                sx={{
                    width: '20rem',
                    height: '20rem',
                }}>
                <Login></Login>
            </Box>
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