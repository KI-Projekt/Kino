import React from "react"
import Login from "../components/Login/LoginForm";
import { Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import SignUpForm from "../components/Login/SignUpForm";
import { useNavigate } from "react-router";
import { User } from "../interfaces/Interfaces";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

interface LoginViewProps {
    user?: User;
    setUser: Function;
    setIsAdmin: Function;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
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
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function LoginView(props: LoginViewProps) {

    const theme = useTheme();

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const navigate = useNavigate();

    function navigateToProfileMenu() {
        navigate(`/profile/${props.user?.id}`);
    }

    return (
        <>
            {!props.user?.firstName &&
                <div className="flex justify-center items-center h-180">
                    <div className="flex bg-white rounded-lg pb-5 pt-7 shadow-sm shadow-black w-96">
                        <Box sx={{ bgcolor: 'background.paper' }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    textAlign: "center"
                                }}
                            >
                                Login
                            </Typography>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="secondary"
                                textColor="inherit"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="Sign Up" {...a11yProps(0)} />
                                <Tab label="Sign In" {...a11yProps(1)} />
                            </Tabs>

                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <SignUpForm />
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                <Login setIsAdmin={props.setIsAdmin} setUser={props.setUser} />
                            </TabPanel>
                        </Box>
                    </div>
                </div>
            }
            {props.user?.firstName &&
                navigateToProfileMenu()
            }
        </>
    );
}

export default LoginView;