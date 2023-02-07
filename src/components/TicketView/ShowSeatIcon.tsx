import { ShowSeat } from "../../interfaces/Interfaces";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import StairsOutlinedIcon from "@mui/icons-material/StairsOutlined";
import ChairIcon from '@mui/icons-material/Chair';
import AccessibleIcon from '@mui/icons-material/Accessible';
import { IconButton } from "@mui/material";

interface ShowSeatIconProps {
    onSeatClick: Function;
    windowWidth: number;
    seat: ShowSeat;
}

function ShowSeatIcon(props: ShowSeatIconProps) {
    function setSeatIcon() {
        switch (props.seat.seat.category) {
            case "NORMAL":
                return <EventSeatIcon id={props.seat.seat.id?.toString()} />;
            case "PREMIUM":
                return <ChairIcon id={props.seat.seat.id?.toString()} />;
            case "WHEELCHAIR_ACCESSIBLE":
                return <AccessibleIcon id={props.seat.seat.id?.toString()} />;
            case "STAIRS":
                return <StairsOutlinedIcon id={props.seat.seat.id?.toString()} />;
        }
    }

    return (
        <>
            {props.seat.seat.id && (
                <IconButton
                    sx={{
                        width: {
                            xs: `${(props.windowWidth / 320)}rem`,
                            sm: `${(props.windowWidth / 300)}rem`,
                            md: `${(props.windowWidth / 580)}rem`,
                            xl: `${(props.windowWidth / 580)}rem`
                        }
                    }}
                    id={props.seat.seat.id.toString()}
                    onClick={(e) => props.onSeatClick(e)}
                    disabled={props.seat.seat.category == "STAIRS" || props.seat.reserved}
                    color={props.seat.selected ? "primary" : "secondary"}
                >
                    {setSeatIcon()}
                </IconButton>
            )}
        </>
    );
}

export default ShowSeatIcon;