import 'bootstrap/dist/css/bootstrap.min.css';
import StoreIcon from '@mui/icons-material/Store';
import { Box, Divider, Grid, ToggleButton, ToggleButtonGroup, Typography, useTheme } from '@mui/material';
import React from 'react';

function PaymentOptions() {
    const [paymentMethod, setPaymentMethod] = React.useState<string | null>('cash')

    const handlePaymentMethod = (
        event: React.MouseEvent<HTMLElement>,
        newPaymentMethod: string | null,
    ) => {
        setPaymentMethod(newPaymentMethod);
    };

    const theme = useTheme();

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
            }}
            alignItems='center'
        >
            <Divider />
            <Box >
                <Grid container spacing={2}>
                    <Grid xs={12} sm={12} md={4} xl={4}>
                        <Typography variant="h4" sx={{ p: 3, paddingLeft: theme.spacing, }}>Payment method</Typography>
                    </Grid>
                    <Grid xs={12} sm={12} md={2} xl={2}>
                    </Grid>
                    <ToggleButtonGroup
                        value={paymentMethod}
                        exclusive
                        onChange={handlePaymentMethod}
                        aria-label="payment method"
                        sx={{ p: 3, paddingLeft: theme.spacing, }}
                    >
                        <ToggleButton value="cash" aria-label='pay with cash'>
                            <StoreIcon />
                            <Typography>Pay local</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Box>
        </Box>
    );
}

export default PaymentOptions;