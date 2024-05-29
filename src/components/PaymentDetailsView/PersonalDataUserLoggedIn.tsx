import { Box, Button, TextField, useTheme } from "@mui/material";
import React from "react"
import SaveIcon from '@mui/icons-material/Save';
import { User } from "../../interfaces/Interfaces";
import { changeUser } from "../../queries/changeUser";
import Alerts from "../Alerts";

interface PersonalDataUserLoggedInProps {
  personalDataFilled: boolean;
  setPersonalDataFilled: Function;
  user: User;
  setUser: Function;
  personalDataChanged: boolean;
  setPersonalDataChanged: Function;
}

function PersonalDataUserLoggedIn(props: PersonalDataUserLoggedInProps) {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [alertText, setAlertText] = React.useState("User Data was updated successfully!");

  React.useEffect(() => {
    setAllRequiredDataFilled(props.user);
  });

  const saveUserProfile = () => {
    changeUser(props.user).then(result => {
      if (result.error) {
        setAlertText(result.error);
        setIsError(true);
        setAlertOpen(true)
      } else if (result.errorMessage) {
        setAlertText(result.errorMessage);
        setIsError(true);
        setAlertOpen(true)
      } else {
        setIsError(false);
        setAlertOpen(true);
        props.setPersonalDataChanged(false);
      }
    });
  }

  const theme = useTheme();

  const setAllRequiredDataFilled = (newUser: User) => {
    if (
      newUser.id &&
      newUser.city &&
      newUser.email &&
      newUser.firstName &&
      newUser.houseNumber &&
      newUser.zip &&
      newUser.street &&
      newUser.lastName
    ) {
      props.setPersonalDataFilled(true);
    } else {
      props.setPersonalDataFilled(false);
    }
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newUser = {
      ...props.user,
      [e.target.id]: e.target.value,
    };
    props.setUser(newUser);
    setAllRequiredDataFilled(newUser);
    props.setPersonalDataChanged(true);
  };

  return (
    <Box
      component="form"
      sx={{
        paddingX: theme.spacing,
        "& .MuiTextField-root": { m: 0.5, width: "100%" },
      }}
      noValidate
      autoComplete="on"
    >
      <Box sx={{ display: "flex" }}>
        <TextField
          required
          type="text"
          placeholder="Jane"
          label="First Name"
          id="firstName"
          value={props.user.firstName}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => handleOnChange(e)}
        />
      </Box>

      <Box sx={{ display: "flex" }}>
        <TextField
          required
          type="text"
          placeholder="Doe"
          label="Surname"
          id="lastName"
          value={props.user.lastName}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => handleOnChange(e)}
        />
      </Box>

      <Box sx={{ display: "flex" }}>
        <TextField
          required
          type="text"
          className="w-full mb-4"
          placeholder="Fifth Avenue"
          label="Street"
          id="street"
          value={props.user.street}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => handleOnChange(e)}
        />
        <TextField
          required
          type="text"
          className="w-full mb-4"
          placeholder="69"
          label="House number"
          id="houseNumber"
          value={props.user.houseNumber}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => handleOnChange(e)}
        />
      </Box>

      <Box sx={{ display: "flex" }}>
        <TextField
          required
          type="text"
          className="w-full mb-4"
          placeholder="68165"
          label="Postcode"
          id="zip"
          value={props.user.zip}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => handleOnChange(e)}
        />
        <TextField
          required
          type="text"
          className="w-full mb-4"
          placeholder="Mannheim"
          label="City"
          id="city"
          value={props.user.city}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => handleOnChange(e)}
        />
      </Box>

      <Box sx={{ display: "flex" }}>
        <TextField
          required
          type="email"
          placeholder="Jane.doe@example.com"
          label="Email Address"
          id="email"
          value={props.user.email}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => handleOnChange(e)}
        />
      </Box>

      <Button
        sx={{ my: 2 }}
        startIcon={<SaveIcon />}
        variant="contained"
        fullWidth
        disabled={!props.personalDataChanged}
        onClick={saveUserProfile}
      >
        Save
      </Button>
      <Alerts alertOpen={alertOpen} alertText={alertText} isError={isError} setAlertOpen={setAlertOpen} />
    </Box>
  );
}

export default PersonalDataUserLoggedIn;