import { Grid, Card, CardHeader, CardMedia, CardContent, Typography, Divider, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import Youtube from 'react-youtube'
import ShowTiles, { Show, ShowDate } from "./ShowTiles";
import { Movie } from "../../views/MovieDetailsView";

interface MovieDetailsViewUserProp {
    selectedMovie: Movie,
    setSelectedMovie: React.Dispatch<Movie>,
    onShowTileClick: (currentShow: Show) => void,
    showData: Array<ShowDate>,
}

function UserMovieDetailsView(props: MovieDetailsViewUserProp) {

    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} xl={4} >
                    <Card
                        sx={{
                            marginLeft: theme.spacing(1),
                            marginRight: theme.spacing(1),
                        }}
                        elevation={0}
                    >
                        <CardHeader
                            title={props.selectedMovie.Title}
                            titleTypographyProps={{ p: theme.spacing(3), pt: theme.spacing(2), paddingLeft: 0, fontSize: theme.typography.h4.fontSize }}
                        />

                        <CardMedia
                            component="img"
                            alt="movie poster"
                            image={props.selectedMovie.Poster} />

                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Runtime: {props.selectedMovie.Runtime} <br />
                                Writer: {props.selectedMovie.Writer} <br />
                                Cast: {props.selectedMovie.Actors} <br />
                                Genres: {props.selectedMovie.Genre} <br />
                                Age Rating: {props.selectedMovie.Rated} <br />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={4} >
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
                                {props.selectedMovie.Plot}
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
                </Grid>
                <Grid item xs={12} sm={12} md={12} xl={4} >
                    <Divider orientation='vertical' flexItem sx={{ borderBottomWidth: "0.2rem" }} />
                    <Box sx={{ marginTop: theme.spacing(1) }}>
                        <Typography
                            variant="h4"
                            sx={{
                                p: 3,
                                paddingLeft: theme.spacing
                            }}
                        >
                            Shows
                        </Typography>
                        <ShowTiles shows={props.showData} onShowTileClick={props.onShowTileClick} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default UserMovieDetailsView;