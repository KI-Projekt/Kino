import { Box, Typography, Tab, Tabs, useTheme } from "@mui/material";
import React from "react"
import { User } from "../../interfaces/Interfaces";
import Login from '../Login/LoginForm'
import SignUpForm from "../Login/SignUpForm";
import PersonalDataGuestUser from "./PersonalDataGuestUser";
import PersonalDataUserLoggedIn from "./PersonalDataUserLoggedIn";

export interface PersonalDataProps {
    personalDataFilled: boolean;
    setPersonalDataFilled: Function;
    user: User;
    setUser: Function;
}

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
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

function PersonalData(props: PersonalDataProps) {

    const theme = useTheme();

    const [value, setValue] = React.useState(0);

    const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        props.setPersonalDataFilled(false);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper' }} alignItems='center' textAlign="center" justifyContent="center">
            <Typography variant="h4" sx={{ p: 3, paddingLeft: theme.spacing }}>Personal Data</Typography>
            {!props.user.firstName &&
                <>
                    <Tabs
                        value={value}
                        onChange={handleChangeTabs}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        centered
                    >
                        <Tab label="Without Account" {...a11yProps(0)} />
                        <Tab label="Sign In" {...a11yProps(1)} />
                        <Tab label="Sign Up" {...a11yProps(2)} />
                    </Tabs>
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <PersonalDataGuestUser
                            personalDataFilled={props.personalDataFilled}
                            setPersonalDataFilled={props.setPersonalDataFilled}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Login setUser={props.setUser} />
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <SignUpForm />
                    </TabPanel>
                </>
            }
            {props.user.firstName &&
                <Box sx={{ p: 3 }}>
                    <Typography sx={{ pb: 2 }}>You are loggin in as {props.user.firstName} {props.user.surname}.</Typography>
                    <PersonalDataUserLoggedIn
                        personalDataFilled={props.personalDataFilled}
                        setPersonalDataFilled={props.setPersonalDataFilled}
                        user={props.user}
                        setUser={props.setUser}
                    />
                </Box>
            }
        </Box>
    );
}

export default PersonalData; 