import React from "react"
import '../../styles/Login.css';
import { Button, Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, useTheme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerUser, UserInput } from "../../queries/authentication";
import Alerts from "../Alerts";

interface State {
  password: string;
  matchingPassword: string;
  showPassword: boolean;
  showRepeatedPassword: boolean;
}

interface SignUpFormProps {
  setValue?: Function;
}

function SignUpForm(props: SignUpFormProps) {

  function createUserData(
    id: number | undefined,
    firstName: string | undefined,
    lastName: string | undefined,
    street: string | undefined,
    houseNumber: string | undefined,
    zip: string | undefined,
    city: string | undefined,
    email: string | undefined,
    password: string | undefined,
    matchingPassword: string | undefined,
  ) {
    return { id, firstName, lastName, street, houseNumber, zip, city, email, password, matchingPassword };
  }

  const initialUser = (
    createUserData(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)
  )

  const [guestUser, setGuestUser] = React.useState<UserInput>(initialUser);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [alertText, setAlertText] = React.useState("Successfully registered");
  const [values, setValues] = React.useState<State>({
    password: '',
    matchingPassword: '',
    showPassword: false,
    showRepeatedPassword: false
  });

  const handleChangePassword =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setGuestUser({ ...guestUser, [prop]: event.target.value })
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = (isRepeated: boolean) => {
    isRepeated ? setValues({
      ...values,
      showRepeatedPassword: !values.showRepeatedPassword,
    })
      :
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const theme = useTheme();

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newUser = {
      ...guestUser,
      [e.target.id]: e.target.value
    };
    setGuestUser(newUser);
  }

  const handleSignupClick = () => {
    registerUser(guestUser).then(result => {
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
        setAlertText("Successfully registered. Please sign in to continue.");
        if (props.setValue)
          props.setValue(2);
      }
    });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          paddingX: theme.spacing,
          '& .MuiTextField-root': { m: 0.5, width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          type="text"
          className="Form-Login-Input"
          placeholder="Jane"
          label="First Name"
          id="firstName"
          value={guestUser.firstName}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleOnChange(e)}
        />

        <TextField
          required
          type="text"
          className="Form-Login-Input"
          placeholder="Doe"
          label="Surname"
          id="lastName"
          value={guestUser.lastName}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleOnChange(e)}
        />

        <Box sx={{ display: 'flex' }}>
          <TextField
            required
            type="text"
            className="Form-Login-Input"
            placeholder="Fifth Avenue"
            label="Street" id="street"
            value={guestUser.street}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleOnChange(e)}
          />
          <TextField
            required
            type="text"
            className="Form-Login-Input"
            placeholder="69"
            label="House number"
            id="houseNumber"
            value={guestUser.houseNumber}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleOnChange(e)}
          />
        </Box>

        <Box sx={{ display: 'flex' }}>
          <TextField
            required
            type="text"
            className="Form-Login-Input"
            placeholder="68165"
            label="Postcode"
            id="zip"
            value={guestUser.zip}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleOnChange(e)}
          />
          <TextField
            required
            type="text"
            className="Form-Login-Input"
            placeholder="Mannheim"
            label="City"
            id="city"
            value={guestUser.city}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleOnChange(e)}
          />
        </Box>

        <TextField
          required
          type="email"
          className="Form-Login-Input"
          placeholder="Jane.doe@example.com"
          label="Email Address"
          id="email"
          value={guestUser.email}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleOnChange(e)}
        />

        <FormControl sx={{ m: 0.5, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password-signUp">Password *</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-signUp"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChangePassword('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword(false)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 0.5, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password-signUp-repeated">Repeat Password *</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-signUp-repeated"
            type={values.showRepeatedPassword ? 'text' : 'password'}
            value={values.matchingPassword}
            onChange={handleChangePassword('matchingPassword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword(true)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showRepeatedPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Repeat Password"
          />
        </FormControl>
      </Box>
      <div className="d-grid gap-2 mt-3">
        <Button sx={{ m: 0.5, width: '100%' }} variant="contained" onClick={handleSignupClick}>Sign Up</Button>
      </div>
      <Alerts alertOpen={alertOpen} alertText={alertText} isError={isError} setAlertOpen={setAlertOpen} />
    </>
  )
}

export default SignUpForm;