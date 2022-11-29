import React from "react"
import '../styles/Login.css';
import { Button, Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface State {
  password: string;
  repeatedPassword: string;

  showPassword: boolean;
  showRepeatedPassword: boolean;
}

function SignUp() {
  const [values, setValues] = React.useState<State>({
    password: '',
    repeatedPassword: '',
    showPassword: false,
    showRepeatedPassword: false
  });

  const handleChangePassword =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="Login-form-container">
      <div className="Login-form">
        <div className="Login-form-content">
          <h3 className="Login-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered? <a href="login">Sign In</a>
          </div>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 0.5, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              type="text"
              className="form-login-input"
              placeholder="Jane"
              label="First Name"
            />

            <TextField
              required
              type="text"
              className="form-login-input"
              placeholder="Doe"
              label="Surname"
            />

            <TextField
              required
              type="email"
              className="form-login-input"
              placeholder="Jane.doe@example.com"
              label="Email Address"
            />

            <FormControl sx={{ m: 0.5, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChangePassword('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={()=> handleClickShowPassword(false)}
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
              <InputLabel htmlFor="outlined-adornment-password">Repeat Password *</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showRepeatedPassword ? 'text' : 'password'}
                value={values.repeatedPassword}
                onChange={handleChangePassword('repeatedPassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={()=> handleClickShowPassword(true)}
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
            <Button sx={{ m: 0.5, width: '100%' }} variant="contained">Sign Up</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;