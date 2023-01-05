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
                <Typography>Hallo</Typography>
            }
            {!props.user.firstName && navigateToLogin()}
        </>
    );
}

export default UserProfile;