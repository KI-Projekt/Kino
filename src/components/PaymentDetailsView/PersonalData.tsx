import { Box, Typography, Tab, Tabs, useTheme } from "@mui/material";
import React from "react"
import Login from '../Login/LoginForm'
import SignUpForm from "../Login/SignUpForm";
import PersonalDataGuestUser from "./PersonalDataGuestUser";

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

function PersonalData() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }} alignItems='center'>
            <Typography variant="h4" sx={{p: 3, paddingLeft:'5rem'}}>Personal Data</Typography>
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
                <PersonalDataGuestUser />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <Login />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                <SignUpForm />
            </TabPanel>
        </Box>
    );
}

export default PersonalData; 