import { Box, Button, TextField, useTheme } from "@mui/material";
import React from "react";
import "../../styles/Login.css";
import { User } from "../PaymentDetailsView/PersonalDataGuestUser";
import SaveIcon from "@mui/icons-material/Save";

interface UserProfileViewProps {
  personalDataFilled: boolean;
  setPersonalDataFilled: Function;
  user: User;
  setUser: Function;
}

function UserProfileView(props: UserProfileViewProps) {
  React.useEffect(() => {
    setAllRequiredDataFilled(props.user);
  });

  const theme = useTheme();

  const [dataChanged, setDataChanged] = React.useState<boolean>(false);

  const setAllRequiredDataFilled = (newUser: User) => {
    if (
      newUser.userID &&
      newUser.city &&
      newUser.emailAdress &&
      newUser.firstName &&
      newUser.houseNumber &&
      newUser.postcode &&
      newUser.street &&
      newUser.surname
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
    setDataChanged(true);
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

      <TextField
        disabled
        variant="outlined"
        type="text"
        placeholder="Doe"
        label="Surname"
        id="surname"
        value={props.user.surname}
        onChange={(
          e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => handleOnChange(e)}
      />

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
          id="postcode"
          value={props.user.postcode}
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

      <TextField
        disabled
        variant="outlined"
        type="email"
        placeholder="Jane.doe@example.com"
        label="Email Address"
        id="emailAdress"
        value={props.user.emailAdress}
        onChange={(
          e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => handleOnChange(e)}
      />

      {/* <Button
        sx={{ my: 2 }}
        startIcon={<SaveIcon />}
        variant="contained"
        fullWidth
        disabled={!dataChanged}
      >
        Save
      </Button> */}
    </Box>
  );
}

export default UserProfileView;