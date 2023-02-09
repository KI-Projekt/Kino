import 'bootstrap/dist/css/bootstrap.min.css';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Box, Divider, Grid, ToggleButton, ToggleButtonGroup, Typography, useTheme } from '@mui/material';
import React from 'react';

interface PaymentOptionsProps {
    paymentMethod: string | null;
    setPaymentMethod: Function;
}

function PaymentOptions(props: PaymentOptionsProps) {

    const theme = useTheme();

    const handlePaymentMethod = (
        event: React.MouseEvent<HTMLElement>,
    ) => {
        props.setPaymentMethod(event.currentTarget.id);
    };

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
            }}
            alignItems='center'
        >
            <Divider />
            <Box >
                <Grid container >
                    <Grid xs={12} sm={12} md={4} xl={4}>
                        <Typography variant="h4" sx={{ p: 3, paddingLeft: theme.spacing, }}>Payment method</Typography>
                    </Grid>
                    <Grid xs={12} sm={12} md={2} xl={2}>
                    </Grid>
                    <ToggleButtonGroup
                        value={props.paymentMethod}
                        exclusive
                        onChange={(e) => handlePaymentMethod(e)}
                        aria-label="payment method"
                        sx={{ p: 3, paddingLeft: theme.spacing, }}
                    >
                        <ToggleButton id="cash" value="cash" aria-label='pay with cash'>
                            <StoreIcon />
                            <Typography>Pay local</Typography>
                        </ToggleButton>
                        <ToggleButton id="creditCard" value="creditCard" aria-label='pay with credit card'>
                            <CreditCardIcon />
                            <Typography>Pay with CreditCard</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Box>
        </Box>
    );
}

export default PaymentOptions;