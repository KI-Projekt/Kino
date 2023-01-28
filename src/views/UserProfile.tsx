import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { User } from "../interfaces/Interfaces";

interface UserProfileProps {
    user: User;
}

function UserProfile(props: UserProfileProps) {

    const navigate = useNavigate();

    function navigateToLogin() {
        navigate("/login")
    }
    return (
        <>
            {props.user.firstName &&
                <Typography>You are logged in as {props.user.firstName} {props.user.surname}.</Typography>
            }
            {!props.user.firstName && navigateToLogin()}
        </>
    );
}

export default UserProfile;