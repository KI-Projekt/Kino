import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Box, TextField, Button, Typography, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, ButtonGroup } from "@mui/material";
import React, { useState } from "react"
import Login from "../Login";

interface State {
    password: string;
    showPassword: boolean;
    signUpPassword: string;
    showSignUpPassword: boolean;
    repeatedSignUpPassword: string;
    showRepeatedSignUpPassword: boolean;
}


function PersonalData() {
    const [personalDataMode, setPersonalDataMode] = useState("guest");

    const guestMode = "guest";
    const signInMode = "signIn";
    const signUpMode = "signUp";

    const handleSingnIn = (event: React.MouseEvent<HTMLElement>) => {
        setPersonalDataMode(signInMode);
    };

    const handleSingnUp = (event: React.MouseEvent<HTMLElement>) => {
        setPersonalDataMode(signUpMode);
    };

    const handleGuest = (event: React.MouseEvent<HTMLElement>) => {
        setPersonalDataMode(guestMode);
    };

    //for Login

    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false,
        signUpPassword: '',
        showSignUpPassword: false,
        repeatedSignUpPassword: '',
        showRepeatedSignUpPassword: false,
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

    const handleClickShowSignUpPassword = (isRepeated: boolean) => {
        isRepeated ? setValues({
            ...values,
            showRepeatedSignUpPassword: !values.showRepeatedSignUpPassword,
        })
            :
            setValues({
                ...values,
                showSignUpPassword: !values.showSignUpPassword,
            });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChangeSignUpPassword =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    //for Login End



    if (personalDataMode === signInMode) {
        return (
            <div className="Login-Form-Content">
                <Typography variant="h3" align="left" sx={{ pt: '3rem', pb: '2rem' }}>Sign In</Typography>
                <Typography align="left">
                    <ButtonGroup variant="outlined" sx={{ mb: '1rem' }}>
                        <Button onClick={handleGuest}>Sign In as Guest User</Button>
                        <Button onClick={handleSingnUp}>Create new account?</Button>
                    </ButtonGroup>
                </Typography>
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
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
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

    if (personalDataMode === signUpMode) {
        return (
            <div className="Login-Form-Content">
                <Typography variant="h3" align="left" sx={{ pt: '3rem', pb: '2rem' }}>Sign Up</Typography>
                <Typography align="left">
                    <ButtonGroup variant="outlined" sx={{ mb: '1rem' }}>
                        <Button onClick={handleGuest}>Sign In as Guest User</Button>
                        <Button onClick={handleSingnIn}>Already registered?</Button>
                    </ButtonGroup>
                </Typography>
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
                        className="Form-Login-Input"
                        placeholder="Jane"
                        label="First Name"
                    />

                    <TextField
                        required
                        type="text"
                        className="Form-Login-Input"
                        placeholder="Doe"
                        label="Surname"
                    />

                    <TextField
                        required
                        type="email"
                        className="Form-Login-Input"
                        placeholder="Jane.doe@example.com"
                        label="Email Address"
                    />

                    <FormControl sx={{ m: 0.5, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showSignUpPassword ? 'text' : 'password'}
                            value={values.signUpPassword}
                            onChange={handleChangeSignUpPassword('signUpPassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowSignUpPassword(false)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showSignUpPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="signUpPassword"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 0.5, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Repeat Password *</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showRepeatedSignUpPassword ? 'text' : 'password'}
                            value={values.repeatedSignUpPassword}
                            onChange={handleChangeSignUpPassword('repeatedSignUpPassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowSignUpPassword(true)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showRepeatedSignUpPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Repeat signUpPassword"
                        />
                    </FormControl>
                </Box>
                <div className="d-grid gap-2 mt-3">
                    <Button sx={{ m: 0.5, width: '100%' }} variant="contained">Sign Up</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="Login-Form-Content">
            <Typography variant="h3" sx={{ pt: '3rem', pb: '2rem' }}>Personal Data</Typography>
            <Typography align="left">
                <ButtonGroup variant="outlined" sx={{ mb: '1rem' }}>
                    <Button onClick={handleSingnIn}>Already registered?</Button>
                    <Button onClick={handleSingnUp}>Create new account?</Button>
                </ButtonGroup>
            </Typography>
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
                    placeholder="Jane"
                    label="First Name"
                />

                <TextField
                    required
                    type="text"
                    placeholder="Doe"
                    label="Surname"
                />

                <TextField
                    required
                    type="email"
                    placeholder="Jane.doe@example.com"
                    label="Email Address"
                />
            </Box>
        </div>
    )

}

export default PersonalData;