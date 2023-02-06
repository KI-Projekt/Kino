import { IconButton } from "@mui/material";
import { Seat } from "../../interfaces/Interfaces";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import StairsOutlinedIcon from "@mui/icons-material/StairsOutlined";
import ChairIcon from '@mui/icons-material/Chair';
import AccessibleIcon from '@mui/icons-material/Accessible';
import React from "react";

interface SeatProps {
    onSeatClick: Function;
    windowWidth: number;
    editMode: boolean;
    seat: Seat;
}

function SeatIcon(props: SeatProps) {

     function setSeatIcon() {
        switch (props.seat.category) {
            case "NORMAL":
                return <EventSeatIcon />;
            case "PREMIUM":
                return <ChairIcon />;
            case "WHEELCHAIR_ACCESSIBLE":
                return <AccessibleIcon />;
            case "STAIRS":
                return <StairsOutlinedIcon />;
        }
    }
 
    return (
        <>
            {props.seat.id && (
                <IconButton
                    sx={{
                        width: {
                            xs: `${(props.windowWidth / 320)}rem`,
                            sm: `${(props.windowWidth / 300)}rem`,
                            md: `${(props.windowWidth / 580)}rem`,
                            xl: `${(props.windowWidth / 580)}rem`
                        }
                    }}
                    id={props.seat.id.toString()} onClick={() => props.onSeatClick()}
                    disabled={!props.editMode}
                >
                    {setSeatIcon()}
                </IconButton>
            )}
        </>
    );
}

export default SeatIcon;