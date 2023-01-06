import { Box, Card, Divider, Typography, useTheme } from '@mui/material';
import * as React from 'react';
import Youtube from 'react-youtube'
import { Movie } from '../../views/MovieDetailsView';

interface MovieFactsProps {
    selectedMovie: Movie,
}

function MoviePlot(props: MovieFactsProps) {

    const theme = useTheme();

    return (
        <>
            <Divider orientation="vertical" flexItem sx={{ borderBottomWidth: "0.2rem" }} />
            <Box sx={{ marginTop: theme.spacing(1) }}>
                <Card sx={{ marginLeft: theme.spacing(1), marginRight: theme.spacing(1), overflowY: 'auto' }} elevation={0}>
                    <Typography
                        variant="h4"
                        sx={{
                            p: theme.spacing(3),
                            pt: {
                                xs: theme.spacing(1),
                                sm: theme.spacing(3)
                            },
                            paddingLeft: theme.spacing(1)
                        }}
                    >
                        Plot
                    </Typography>
                    <Typography sx={{ padding: theme.spacing(1) }}>
                        {props.selectedMovie.plot}
                    </Typography>
                </Card>
                {props.selectedMovie.trailer &&
                    <Card
                        sx={{
                            marginLeft: theme.spacing(1),
                            marginRight: theme.spacing(1),
                            marginTop: theme.spacing(1),
                        }}
                        elevation={0}
                    >
                        <Youtube videoId={props.selectedMovie.trailer.key} opts={{ width: "100%", outerHeight: '56.25%' }} />
                    </Card>}
            </Box>
        </>
    );
}

export default MoviePlot;