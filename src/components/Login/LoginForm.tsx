import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import React from "react"
import '../../styles/Login.css';
import {Visibility, VisibilityOff} from '@mui/icons-material';

interface State {
  password: string;
  showPassword: boolean;
}

function Login() {
  const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
        <div className="Login-Form-Content">
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 0.5, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              type="email"
              className="Form-Login-Input"
              placeholder="Jane.doe@example.com"
              label="Email Address"
            />
            <FormControl sx={{ m: 0.5, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password-signIn">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-signIn"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
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
            <Button
              sx={{ m: 0.5, width: '100%' }}
              variant="contained"
            >
              Sign In
            </Button>
          </Box>
        </div>
  )
}

export default Login;