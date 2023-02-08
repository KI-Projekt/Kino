import { Button, Grid, Typography } from "@mui/material";
import { redTheme } from "../../interfaces/Theme";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import StairsOutlinedIcon from "@mui/icons-material/StairsOutlined";
import ChairIcon from '@mui/icons-material/Chair';
import AccessibleIcon from '@mui/icons-material/Accessible';

function LegendSeatplanUser() {
    function createButtonData(
        index: number,
        label: String,
        icon: JSX.Element,
    ) {
        return { index, label, icon }
    }

    const ButtonData = [
        createButtonData(1, 'Normal', <EventSeatIcon color='secondary' />),
        createButtonData(2, 'Premium', <ChairIcon color='secondary' />),
        createButtonData(3, 'Wheelchair', <AccessibleIcon color='secondary' />),
        createButtonData(4, 'Stairs', <StairsOutlinedIcon color='secondary' />),
    ];

    return (
        <>
            <Grid container spacing={3} sx={{ pb: 3 }}>
                {ButtonData.map((item: any) => (
                    <Grid item xs={12} sm={6} md={6} xl={3}>
                        <Button
                            startIcon={item.icon}
                            disabled
                        >
                            <Typography sx={{ color: redTheme.palette.primary.contrastText }}>
                                {item.label}
                            </Typography>
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default LegendSeatplanUser;