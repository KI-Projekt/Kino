import { Box, TextField } from "@mui/material";
import React from "react"
import '../../styles/Login.css';

function PersonalDataGuestUser() {
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

export default PersonalDataGuestUser;