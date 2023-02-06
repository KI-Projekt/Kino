import { IconButton, SvgIconTypeMap } from "@mui/material";
import { Seat } from "../../interfaces/Interfaces";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import StairsOutlinedIcon from "@mui/icons-material/StairsOutlined";
import ChairIcon from '@mui/icons-material/Chair';
import AccessibleIcon from '@mui/icons-material/Accessible';
import React from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface SeatProps {
    onSeatClick: Function;
    windowWidth: number;
    editMode: boolean;
    seat: Seat;
}

function SeatIcon(props: SeatProps) {

    const [seatIcon, setSeatIcon] = React.useState<Element | undefined>(undefined);

    React.useEffect(() => {
        //

    }, [])

    return (
        <>
            {props.seat.id && props.seat.category === "NORMAL" && (
                <IconButton
                    sx={{
                        width: {
                            xs: `${(props.windowWidth / 320)}rem`,
                            sm: `${(props.windowWidth / 300)}rem`,
                            md: `${(props.windowWidth / 580)}rem`,
                            xl: `${(props.windowWidth / 580)}rem`
                        }
                    }}
                    id={props.seat.id.toString()} onClick={(e) => props.onSeatClick(e)}
                    disabled={!props.editMode}
                >
                    <EventSeatIcon id={props.seat.id.toString()} />
                </IconButton>
            )}
            {props.seat.id === null && (
                <IconButton
                    sx={{
                        width: {
                            xs: `${(props.windowWidth / 320)}rem`,
                            sm: `${(props.windowWidth / 300)}rem`,
                            md: `${(props.windowWidth / 580)}rem`,
                            xl: `${(props.windowWidth / 580)}rem`
                        }
                    }}
                    disabled={!props.editMode}
                >
                    <StairsOutlinedIcon />
                </IconButton>
            )}
        </>
    );
}

export default SeatIcon;