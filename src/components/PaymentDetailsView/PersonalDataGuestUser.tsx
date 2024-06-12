import { Box, TextField, useTheme } from "@mui/material";
import React from "react"
import { User } from "../../interfaces/Interfaces";

interface PersonalDataGuestUserProps {
    personalDataFilled: boolean;
    setPersonalDataFilled: Function;
}

function PersonalDataGuestUser(props: PersonalDataGuestUserProps) {

    const theme = useTheme();

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
        firstLogin: boolean | undefined,
        aiAccepted: boolean | undefined
    ) {
        return { id, firstName, lastName, street, houseNumber, zip, city, email, password, matchingPassword, firstLogin, aiAccepted };
    }

    const initialUser = (
        createUserData(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)
    )

    const [guestUser, setGuestUser] = React.useState<User>(initialUser);

    const setAllRequiredDataFilled = (newUser: User) => {
        if (newUser.city && newUser.email && newUser.firstName && newUser.houseNumber && newUser.zip && newUser.street && newUser.lastName) {
            props.setPersonalDataFilled(true);
        } else {
            props.setPersonalDataFilled(false);
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newUser = {
            ...guestUser,
            [e.target.id]: e.target.value
        };
        setGuestUser(newUser);
        setAllRequiredDataFilled(newUser);
    }

    return (
        <Box
            component="form"
            sx={{
                paddingX: theme.spacing,
                '& .MuiTextField-root': { m: 0.5, width: '100%' },
            }}
            noValidate
            autoComplete="on"
        >
            <TextField
                required
                type="text"
                placeholder="Jane"
                label="First Name"
                id="firstName"
                value={guestUser.firstName}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleOnChange(e)}
            />

            <TextField
                required
                type="text"
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
                    className="w-full mb-4"
                    placeholder="Fifth Avenue"
                    label="Street"
                    id="street"
                    value={guestUser.street}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleOnChange(e)}
                />
                <TextField
                    required
                    type="text"
                    className="w-full mb-4"
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
                    className="w-full mb-4"
                    placeholder="68165"
                    label="Postcode"
                    id="zip"
                    value={guestUser.zip}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleOnChange(e)}
                />
                <TextField
                    required
                    type="text"
                    className="w-full mb-4"
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
                placeholder="Jane.doe@example.com"
                label="Email Address"
                id="email"
                value={guestUser.email}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleOnChange(e)}
            />
        </Box>
    )
}

export default PersonalDataGuestUser;