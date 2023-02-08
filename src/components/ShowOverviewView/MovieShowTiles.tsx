import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Divider, Grid } from '@mui/material';
import { Show, ShowDate } from '../../interfaces/Interfaces';

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

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
        '& .mainTypography': {
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
interface MovieShowTilesProps {
    shows: Array<ShowDate>,
    onShowTileClick: (currentShow: Show) => void
}

function MovieShowTiles(props: MovieShowTilesProps) {

    const theme = useTheme();

    return (
        <Box sx={{ p: theme.spacing(3), flexGrow: 1 }}>
            <Grid container spacing={3}>
                {props.shows.map((currentShowDate) =>
                    <Grid item xs={12} sm={12} md={6} xl={4}>
                        <>
                            <Typography sx={{ paddingLeft: "1rem", paddingRight: "1rem" }} variant='h5'>{currentShowDate.date.toDateString()}</Typography>
                            {currentShowDate.shows.map((currentShow) => (
                                currentShow.dateTime !== null && (
                                    <ImageButton
                                        onClick={() => props.onShowTileClick(currentShow)}
                                        focusRipple
                                        sx={{
                                            width: theme.spacing(22),
                                            height: theme.spacing(33),
                                            marginLeft: "1rem",
                                            marginRight: "1rem",
                                            marginTop: "1rem",
                                            marginBottom: "1rem",
                                        }}
                                    >
                                        <ImageSrc style={{ backgroundImage: `url(${currentShow.moviePoster})` }} />
                                        <ImageBackdrop className="MuiImageBackdrop-root" />
                                        <Image>
                                            <Typography
                                                className='mainTypography'
                                                component="span"
                                                color="inherit"
                                                sx={{
                                                    position: 'relative',
                                                    p: theme.spacing(4),
                                                    pt: theme.spacing(2),
                                                    pb: (theme) => `calc(${theme.spacing(1)} + 0.6rem)`,
                                                }}
                                            >
                                                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                                    {currentShow.dateTime.getHours()} : {currentShow.dateTime.getMinutes() === 0 ? "00" : currentShow.dateTime.getMinutes()} h <br />
                                                </Typography>
                                                <Typography variant='body1'>
                                                    {currentShow.room?.name}
                                                </Typography>
                                                <ImageMarked className="MuiImageMarked-root" />
                                            </Typography>
                                        </Image>
                                    </ImageButton>
                                )
                            ))}
                            <Divider sx={{ borderBottomWidth: "0.2rem" }} />
                        </>
                    </Grid>
                )}
            </Grid >
        </Box >

    );
}

export default MovieShowTiles;