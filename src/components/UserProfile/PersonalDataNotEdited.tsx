import { Box, Button, TextField, useTheme } from "@mui/material";
import React from "react";
import "../../styles/Login.css";
import { User } from "../../interfaces/Interfaces";
import SaveIcon from "@mui/icons-material/Save";

interface UserProfileViewProps {
  personalDataFilled: boolean;
  setPersonalDataFilled: Function;
  user: User;
  setUser: Function;
  personalDataChanged: boolean;
}

function UserProfileView(props: UserProfileViewProps) {
  React.useEffect(() => {
    setAllRequiredDataFilled(props.user);
  });

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
          disabled
          type="text"
          placeholder="Jane"
          label="First Name"
          id="firstName"
          variant="outlined"
          value={props.user.firstName}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => handleOnChange(e)}
        />
      </Box>

      <Box sx={{ display: "flex" }}>
        <TextField
          disabled
          variant="outlined"
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
          disabled
          variant="outlined"
          type="text"
          className="Form-Login-Input"
          placeholder="Fifth Avenue"
          label="Street"
          id="street"
          value={props.user.street}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => handleOnChange(e)}
        />
        <TextField
          disabled
          variant="outlined"
          type="text"
          className="Form-Login-Input"
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
          disabled
          variant="outlined"
          type="text"
          className="Form-Login-Input"
          placeholder="68165"
          label="Postcode"
          id="zip"
          value={props.user.zip}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => handleOnChange(e)}
        />
        <TextField
          disabled
          variant="outlined"
          type="text"
          className="Form-Login-Input"
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
          disabled
          variant="outlined"
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

      {props.personalDataChanged && (
        <Button
          sx={{ my: 2 }}
          startIcon={<SaveIcon />}
          variant="contained"
          fullWidth
          disabled={!props.personalDataChanged}
        >
          Save
        </Button>
      )}
    </Box>
  );
}

export default UserProfileView;
