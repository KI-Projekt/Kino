import { Box, TextField, useTheme } from "@mui/material";
import React from "react"
import '../../styles/Login.css';

function PersonalDataGuestUser() {
    const theme = useTheme();
    return (
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
                    placeholder="Jane"
                    label="First Name"
                />

                <TextField
                    required
                    type="text"
                    placeholder="Doe"
                    label="Surname"
                />

                <Box sx={{ display: 'flex' }}>
                    <TextField
                        required
                        type="text"
                        className="Form-Login-Input"
                        placeholder="Fifth Avenue"
                        label="Street"
                    />
                    <TextField
                        required
                        type="text"
                        className="Form-Login-Input"
                        placeholder="69"
                        label="House number"
                    />
                </Box>

                <Box sx={{ display: 'flex' }}>
                    <TextField
                        required
                        type="text"
                        className="Form-Login-Input"
                        placeholder="68165"
                        label="Postcode"
                    />
                    <TextField
                        required
                        type="text"
                        className="Form-Login-Input"
                        placeholder="Mannheim"
                        label="City"
                    />
                </Box>

                <TextField
                    required
                    type="email"
                    placeholder="Jane.doe@example.com"
                    label="Email Address"
                />
            </Box>
    )
}

export default PersonalDataGuestUser;