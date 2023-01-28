import { Box, TextField, useTheme } from "@mui/material";
import React from "react"
import { User } from "../../interfaces/Interfaces";
import '../../styles/Login.css';


interface PersonalDataGuestUserProps {
    personalDataFilled: boolean;
    setPersonalDataFilled: Function;
}

function PersonalDataGuestUser(props: PersonalDataGuestUserProps) {

    const theme = useTheme();

    function createUserData(
        userID: number | undefined,
        firstName: string | undefined,
        surname: string | undefined,
        street: string | undefined,
        houseNumber: string | undefined,
        postcode: string | undefined,
        city: string | undefined,
        emailAdress: string | undefined,) {
        return { userID, firstName, surname, street, houseNumber, postcode, city, emailAdress };
    }

    const initialUser = (
        createUserData(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)
    )

    const [guestUser, setGuestUser] = React.useState<User>(initialUser);

    const setAllRequiredDataFilled = (newUser: User) => {
        if (newUser.city && newUser.emailAdress && newUser.firstName && newUser.houseNumber && newUser.postcode && newUser.street && newUser.surname) {
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
                id="surname"
                value={guestUser.surname}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleOnChange(e)}
            />

            <Box sx={{ display: 'flex' }}>
                <TextField
                    required
                    type="text"
                    className="Form-Login-Input"
                    placeholder="Fifth Avenue"
                    label="Street"
                    id="street"
                    value={guestUser.street}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleOnChange(e)}
                />
                <TextField
                    required
                    type="text"
                    className="Form-Login-Input"
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
                    className="Form-Login-Input"
                    placeholder="68165"
                    label="Postcode"
                    id="postcode"
                    value={guestUser.postcode}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleOnChange(e)}
                />
                <TextField
                    required
                    type="text"
                    className="Form-Login-Input"
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
                id="emailAdress"
                value={guestUser.emailAdress}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleOnChange(e)}
            />
        </Box>
    )
}

export default PersonalDataGuestUser;