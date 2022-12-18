import { Box, ButtonBase, Divider, styled, Typography } from '@mui/material';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface Show {
    movieID: string
    showID: string
    roomID: string
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
    shows: Array<ShowDate>
}

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
    },
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
    backgroundColor: theme.palette.common.black,
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
    return (
        <Box sx={{ maxWidth: "40rem", marginTop: "1rem" }}>
            {props.shows.map((currentShowDate) =>
                <Box sx={{ maxWidth: "40rem" }}>
                    <Typography sx={{ paddingLeft: "1rem" }} variant='h5'>{currentShowDate.date.toDateString()}</Typography>
                    {currentShowDate.shows.map((currentShow) =>
                        <ImageButton
                            focusRipple
                            style={{
                                width: "11rem",
                                height: "8rem",
                                marginLeft: "1rem",
                                marginTop: "1rem",
                                marginBottom: "1rem"
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
                                        p: 4,
                                        pt: 2,
                                        pb: (theme) => `calc(${theme.spacing(1)} + 0.6rem)`,
                                    }}
                                >
                                    {currentShow.dateTime.getHours()} : {currentShow.dateTime.getMinutes()}
                                    <ImageMarked className="MuiImageMarked-root" />
                                </Typography>
                            </Image>
                        </ImageButton>
                    )}
                    <Divider sx={{borderBottomWidth: 3}}/>
                </Box>
            )}
        </Box>
    );
}

export default ShowTiles;