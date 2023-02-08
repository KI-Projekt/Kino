import { Button, Grid, Typography } from "@mui/material";
import { redTheme } from "../../interfaces/Theme";

interface LegendSeatplanProps {
    selectedIndex: number;
    setSelectedIndex: Function;
    ButtonData: any;
    editMode: boolean;
    roomChanged: boolean;
}

function LegendSeatplan(props: LegendSeatplanProps) {
    return (
        <>
            <Grid container spacing={3}>
                {props.ButtonData.map((item: any) => (
                    <Grid item xs={12} sm={6} md={6} xl={3}>
                        <Button
                            onClick={() => props.setSelectedIndex(item.index)}
                            startIcon={item.icon}
                            variant={item.index === props.selectedIndex ? 'contained' : 'outlined'}
                            disabled={!props.editMode}
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

export default LegendSeatplan;