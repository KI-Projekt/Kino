import React from "react";
import { Typography } from "@mui/material";
import { User } from "../components/PaymentDetailsView/PersonalDataGuestUser";
import { useNavigate } from "react-router";

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