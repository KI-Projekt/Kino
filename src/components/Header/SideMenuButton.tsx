import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBarProps } from "./Header";

function SideMenuButton(props: AppBarProps) {

    const menuId = 'primary-search-account-menu';

    return (
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
    );
}

export default SideMenuButton;