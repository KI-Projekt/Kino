import React from "react";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import { User } from "../interfaces/Interfaces";
import { useNavigate } from "react-router";
import PersonalDataUserLoggedIn from "../components/PaymentDetailsView/PersonalDataUserLoggedIn";
import PersonalDataNotEdited from "../components/UserProfile/PersonalDataNotEdited";
import { ArrowBack, Edit } from "@mui/icons-material";
import { redTheme } from "../interfaces/Theme";

interface UserProfileProps {
  user: User;
  personalDataFilled: boolean;
  setPersonalDataFilled: Function;
  setUser: Function;
  personalUserDataChanged: boolean;
  setPersonalUserDataChanged: Function;
  saveUserProfile: Function;
}

function UserProfileView(props: UserProfileProps) {
  const navigate = useNavigate();

  function navigateToLogin() {
    navigate("/login");
  }
  const [isEdited, setIsEdited] = React.useState<boolean>(false);

  function handleEdit() {
    setIsEdited(!isEdited);
  }

  return (
    <Container maxWidth='sm' sx={{ pt: 3 }} >
      <Card sx={{ maxWidth: 700, backgroundColor: redTheme.palette.common.white }}>
        <Box sx={{ p: 3 }}>
          <>
            {props.user.firstName && (
              <>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={8} xl={8}>
                    <Typography variant="h4" sx={{ p: redTheme.spacing(3) }}>
                      {" "}
                      Personal Data
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} xl={4} sx={{ textAlign: 'end' }}>
                    {!isEdited && (
                      <Button
                        variant="contained"
                        onClick={handleEdit}
                        startIcon={<Edit />}

                        sx={{ m: redTheme.spacing(3) }}
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
                        sx={{ m: redTheme.spacing(3) }}
                      >
                        Back
                      </Button>
                    )}
                  </Grid>
                </Grid>
                {isEdited && (
                  <PersonalDataUserLoggedIn
                    user={props.user}
                    personalDataFilled={props.personalDataFilled}
                    setPersonalDataFilled={props.setPersonalDataFilled}
                    setUser={props.setUser}
                    setPersonalDataChanged={props.setPersonalUserDataChanged}
                    personalDataChanged={props.personalUserDataChanged}
                    saveUserProfile={props.saveUserProfile}
                  />
                )}{" "}
                {!isEdited && (
                  <PersonalDataNotEdited
                    user={props.user}
                    personalDataFilled={props.personalDataFilled}
                    setPersonalDataFilled={props.setPersonalDataFilled}
                    setUser={props.setUser}
                    personalDataChanged={props.personalUserDataChanged}
                  />
                )}
              </>
            )}
            {!props.user.firstName && navigateToLogin()}
          </>
        </Box>
      </Card >
    </Container >
  );
}

export default UserProfileView;
