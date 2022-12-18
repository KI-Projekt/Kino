import 'bootstrap/dist/css/bootstrap.min.css';
import StoreIcon from '@mui/icons-material/Store';
import { Box, CardContent, Divider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';

function PaymentOptions() {
    const [paymentMethod, setPaymentMethod] = React.useState<string | null>('cash')

    const handlePaymentMethod = (
        event: React.MouseEvent<HTMLElement>,
        newPaymentMethod: string | null,
    ) => {
        setPaymentMethod(newPaymentMethod);
    };
    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                maxWidth: '45rem',
            }}
            alignItems='center'
            justifyItems='center'
        >
            <Divider />
            <Box sx={{
                display: 'flex',
                flexDirection: 'row'
            }}
                alignItems='center'
                justifyItems='center'
            >
                <Typography variant="h4" sx={{ p: 3, paddingLeft: '5rem', maxWidth: '30rem' }}>Payment method</Typography>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <ToggleButtonGroup
                        value={paymentMethod}
                        exclusive
                        onChange={handlePaymentMethod}
                        aria-label="payment method"
                        sx={{ maxWidth: '10rem' }}
                    >
                        <ToggleButton value="cash" aria-label='pay with cash'>
                            <StoreIcon />
                            <Typography>Pay local</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </CardContent>
            </Box>
        </Box>
    );
}

export default PaymentOptions;