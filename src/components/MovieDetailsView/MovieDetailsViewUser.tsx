import { Grid, Typography, Divider, useTheme, Alert } from "@mui/material";
import { Box } from "@mui/system";
import ShowTiles from "./ShowTiles";
import MovieFacts from "./MovieFacts";
import MoviePlot from "./MoviePlot";
import { Movie, Show, ShowDate } from "../../interfaces/Interfaces";

interface MovieDetailsViewUserProp {
    selectedMovie: Movie,
    setSelectedMovie: React.Dispatch<Movie>,
    onShowTileClick: (currentShow: Show) => void,
    showData: Array<ShowDate> | undefined,
}

function UserMovieDetailsView(props: MovieDetailsViewUserProp) {

    const theme = useTheme();


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} xl={4} >
                    <MovieFacts selectedMovie={props.selectedMovie} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={4} >
                    <MoviePlot selectedMovie={props.selectedMovie} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} xl={4} >
                    <Divider orientation='vertical' flexItem sx={{ borderBottomWidth: "0.2rem" }} />
                    <Box sx={{ marginTop: theme.spacing(1) }}>
                        <Typography
                            variant="h4"
                            sx={{
                                p: 3,
                                paddingLeft: theme.spacing(1)
                            }}
                        >
                            Shows
                        </Typography>
                        {props.showData && <ShowTiles shows={props.showData} onShowTileClick={props.onShowTileClick} />}
                        {props.showData === undefined && <Alert severity="warning" sx={{ width: "90%" }}>Currently there are no shows planned. But stay tuned for the future!</Alert>}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default UserMovieDetailsView;