import { Box, ButtonBase, Divider, styled, Typography, useTheme } from '@mui/material';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export interface Show {
    movieID: string
    showID: string
    roomID: string
    room: string
    dateTime: Date
    additionalInfo: {
        language: string
        isThreeD: boolean
        isDbox: boolean
    }
}

export interface ShowDate {
    date: Date
    shows: Array<Show>
}

interface props {
    shows: Array<ShowDate>,
    onShowTileClick: (currentShow: Show) => void
}

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: "0.2rem",
    width: "1rem",
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

function ShowTiles(props: props) {

    const theme = useTheme();

    const navigate = useNavigate();

    const handleOnClick = (showID: string) => {
        navigate(`/showDetails/${showID}`);
        console.log("Klickkkkk")
    };

    return (
        <Box sx={{ marginTop: "1rem" }}>
            {props.shows.map((currentShowDate) =>
                <Box>
                    <Typography sx={{ paddingLeft: "1rem", paddingRight: "1rem" }} variant='h5'>{currentShowDate.date.toDateString()}</Typography>
                    {currentShowDate.shows.map((currentShow) =>
                        <ImageButton
                            onClick={() => props.onShowTileClick(currentShow)}
                            focusRipple
                            sx={{
                                width: {
                                    xs: '90%',
                                    sm: theme.spacing(23),
                                },
                                height: "8rem",
                                marginLeft: "1rem",
                                marginRight: "1rem",
                                marginTop: "1rem",
                                marginBottom: "1rem",
                            }}
                        >
                            <ImageBackdrop className="MuiImageBackdrop-root" />
                            <Image>
                                <Typography
                                    component="span"
                                    variant="h6"
                                    color="inherit"
                                    sx={{
                                        position: 'relative',
                                        p: theme.spacing(4),
                                        pt: theme.spacing(2),
                                        pb: (theme) => `calc(${theme.spacing(1)} + 0.6rem)`,
                                    }}
                                >
                                    {currentShow.dateTime.getHours()} : {currentShow.dateTime.getMinutes()}
                                    <ImageMarked className="MuiImageMarked-root" />
                                </Typography>
                            </Image>
                        </ImageButton>
                    )}
                    <Divider sx={{ borderBottomWidth: "0.2rem" }} />
                </Box>
            )}
        </Box>
    );
}

export default ShowTiles;