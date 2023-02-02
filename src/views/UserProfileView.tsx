import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { User } from "../components/PaymentDetailsView/PersonalDataGuestUser";
import { useNavigate } from "react-router";
import PersonalDataUserLoggedIn from "../components/PaymentDetailsView/PersonalDataUserLoggedIn";
import PersonalDataNotEdited from "../components/UserProfile/PersonalDataNotEdited";
import "../styles/UserProfile.css";
import { ArrowBack, Edit } from "@mui/icons-material";

interface UserProfileProps {
  user: User;
  personalDataFilled: boolean;
  setPersonalDataFilled: Function;
  setUser: Function;
}

function UserProfileView(props: UserProfileProps) {
  const navigate = useNavigate();

  function navigateToLogin() {
    navigate("/login");
  }
  const [isEdited, setIsEdited] = React.useState<boolean>(false);
  const theme = useTheme();

  function handleEdit() {
    setIsEdited(!isEdited);
  }

  return (
    <>
      {props.user.firstName && (
        <>
          <Box>
            {!isEdited && (
              <Button
                variant="contained"
                onClick={handleEdit}
                className="UserProfile-Button"
                startIcon={<Edit />}
              >
                Edit
              </Button>
            )}
            {isEdited && (
              <Button
                variant="contained"
                onClick={handleEdit}
                className="UserProfile-Button"
                startIcon={<ArrowBack />}
              >
                Back
              </Button>
            )}
          </Box>
          <Typography variant="h4" className="UserProfile-Headline">
            {" "}
            Personal Data
          </Typography>
          {isEdited && (
            <PersonalDataUserLoggedIn
              user={props.user}
              personalDataFilled={props.personalDataFilled}
              setPersonalDataFilled={props.setPersonalDataFilled}
              setUser={props.setUser}
            />
          )}{" "}
          {!isEdited && (
            <PersonalDataNotEdited
              user={props.user}
              personalDataFilled={props.personalDataFilled}
              setPersonalDataFilled={props.setPersonalDataFilled}
              setUser={props.setUser}
            />
          )}
        </>
      )}
      {!props.user.firstName && navigateToLogin()}
    </>
  );
}

export default UserProfileView;
