import { Button, Card, CardContent, CardHeader, Grid, Tooltip, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import MovieFacts from "../components/MovieDetailsView/MovieFacts";
import MoviePlot from "../components/MovieDetailsView/MoviePlot";
import { getMovieAfterReload, getShowAfterReload } from "./TicketView";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useNavigate } from "react-router-dom";
import { fetchTrailerFromTMDb } from "../queries/fetchOMDbAPI";
import { Movie, Show, TrailerType } from "../interfaces/Interfaces";
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import SpeakerGroupIcon from '@mui/icons-material/SpeakerGroup';

interface MovieDetailsViewUserProp {
    selectedMovie: Movie | undefined,
    setSelectedMovie: React.Dispatch<Movie>,
    setSelectedShow: React.Dispatch<React.SetStateAction<Show | undefined>>;
    selectedShow: Show | undefined;
}

function UserMovieDetailsView(props: MovieDetailsViewUserProp) {

    const theme = useTheme();

    const setSelectedShow = props.setSelectedShow
    const setSelectedMovie = props.setSelectedMovie

    useEffect(() => {
        function appendTrailer(trailers: Array<TrailerType>, fetchedMovie: Movie) {

            trailers.forEach((item: TrailerType) => {
                setSelectedMovie({ ...fetchedMovie, trailer: item.type === "Trailer" ? item : undefined })
            })
        }

        getShowAfterReload().then(result => setSelectedShow(result))
        getMovieAfterReload().then(result => {
            fetchTrailerFromTMDb(result.imdbId).then((trailers) => appendTrailer(trailers.results, result));
        });

    }, [setSelectedShow, setSelectedMovie]);

    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} xl={4} >
                    {props.selectedMovie && <MovieFacts selectedMovie={props.selectedMovie} />}
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6} >
                    {props.selectedMovie && <MoviePlot selectedMovie={props.selectedMovie} />}
                    {props.selectedMovie && props.selectedShow &&
                        <>
                            <Card
                                sx={{
                                    marginLeft: theme.spacing(1),
                                    marginRight: theme.spacing(1),
                                }}
                                elevation={0}
                            >
                                <CardHeader
                                    align="center"
                                    title={"Your Show on " + props.selectedShow.dateTime?.toDateString()}
                                    titleTypographyProps={{ p: theme.spacing(1), pt: theme.spacing(1), paddingLeft: 0, fontSize: theme.typography.h4.fontSize }} />
                                <CardContent>
                                    <Typography variant="h4" align="center" >
                                        {props.selectedShow.dateTime?.getHours()} : {props.selectedShow.dateTime?.getMinutes() === 0 ? "00" : props.selectedShow.dateTime?.getMinutes()}h
                                        <br />
                                        {props.selectedShow.additionalInfo.isThreeD &&
                                            <Tooltip title='3D'>
                                                <ThreeDRotationIcon color='inherit' />
                                            </Tooltip>
                                        }
                                        {props.selectedShow.additionalInfo.hasDolbyAtmos &&
                                            <Tooltip title='Dolby Atmos'>
                                                <SpeakerGroupIcon color='inherit' />
                                            </Tooltip>
                                        }
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center" sx={{ p: theme.spacing(1) }}>
                                        {props.selectedShow.room?.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Button
                                sx={{ width: "100%", marginBottom: theme.spacing(2) }}
                                variant="contained"
                                onClick={() => navigate(`/showDetails/${props.selectedMovie?.id}/${props.selectedShow?.showID}`)}
                                startIcon={<ConfirmationNumberIcon />}
                            >
                                Continue
                            </Button></>
                    }
                </Grid>
            </Grid>
        </Box>
    );
}

export default UserMovieDetailsView;