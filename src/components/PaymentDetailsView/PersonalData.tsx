import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Box, TextField, Button, Typography, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, ButtonGroup, AppBar, Tab, Tabs, useTheme } from "@mui/material";
import React, { useState } from "react"
import Login from "../Login";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}
interface State {
    password: string;
    showPassword: boolean;
    signUpPassword: string;
    showSignUpPassword: boolean;
    repeatedSignUpPassword: string;
    showRepeatedSignUpPassword: boolean;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`personal-data-tabpanel-${index}`}
            aria-labelledby={`personal-data-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `personal-data-tab-${index}`,
        'aria-controls': `personal-data-tabpanel-${index}`,
    };
}



export default function FullWidthTabs() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const guestMode = "guest";
    const signInMode = "signIn";
    const signUpMode = "signUp";

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

    return (
        <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChangeTabs}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Without Account" {...a11yProps(0)} />
                    <Tab label="Sign In" {...a11yProps(1)} />
                    <Tab label="Sign Up" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
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
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
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
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
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
            </TabPanel>
        </Box>
    );
}


/* 



function PersonalData() {
    


    if (personalDataMode === signInMode) {
        return (
            
        )
    }

    if (personalDataMode === signUpMode) {
        return (
           
        )
    }

    return (
        
    )

}

export default PersonalData; */