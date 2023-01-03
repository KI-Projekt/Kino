import * as React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Youtube from "react-youtube";
import { Show, ShowDate } from "./ShowTiles";
import { Movie } from "../../views/MovieDetailsView";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from '@mui/icons-material/Update';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from "react-router-dom";
import { deleteMovie, postNewMovie, updateMovie } from "../../queries/changeMovies";
import ShowDetails from "./ShowDetails";

interface MovieDetailsViewAdminProp {
  selectedMovie: Movie;
  setSelectedMovie: React.Dispatch<Movie>;
  isNew: boolean;
  setIsNew: Function;
  onShowTileClick: (currentShow: Show) => void;
  showData: Array<ShowDate>;
  setShowData: Function;
}

function AdminMovieDetailsView(props: MovieDetailsViewAdminProp) {
  const theme = useTheme();

  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [alertText, setAlertText] = React.useState("The Movie was added successfully!");

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  const handleDeleteMovie = () => {
    deleteMovie(props.selectedMovie.id)
    setDialogOpen(false);
  }

  const handleUpdateMovie = () => {
    let changedMovie = {
      id: props.selectedMovie.id,
      title: props.selectedMovie.title,
      releaseYear: props.selectedMovie.releaseYear,
      posterImage: props.selectedMovie.posterImage,
      rated: props.selectedMovie.rated,
      runtime: props.selectedMovie.runtime,
      genre: props.selectedMovie.genre,
      actors: props.selectedMovie.actors,
      plot: props.selectedMovie.plot,
      trailer: undefined,
      imdbId: props.selectedMovie.imdbId,
      imdbRating: props.selectedMovie.imdbRating,
      imdbRatingCount: props.selectedMovie.imdbVotes
    }
    updateMovie(changedMovie).then((result) => {
      if (result.errorMessage) {
        setAlertText(result.errorMessage);
        setIsError(true);
      } else {
        setAlertText("The Movie was updated successfully!");
      }
      setAlertOpen(true);
      props.setIsNew(false);
    });
  };

  const handleButtonCklick = (link: String) => {
    navigate(`/${link}`);
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    props.setSelectedMovie({
      ...props.selectedMovie,
      [e.target.id]: e.target.value,
    });
  };

  function handleAddNewMovie() {
    let newMovie = {
      title: props.selectedMovie.title,
      releaseYear: props.selectedMovie.releaseYear,
      posterImage: props.selectedMovie.posterImage,
      rated: props.selectedMovie.rated,
      runtime: props.selectedMovie.runtime,
      genre: props.selectedMovie.genre,
      actors: props.selectedMovie.actors,
      plot: props.selectedMovie.plot,
      trailer: undefined,
      imdbId: props.selectedMovie.imdbId,
      imdbRating: props.selectedMovie.imdbRating,
      imdbRatingCount: props.selectedMovie.imdbVotes
    }
    postNewMovie(newMovie).then((result) => {
      if (result.errorMessage) {
        setAlertText(result.errorMessage);
        setIsError(true);
      } else {
        setAlertText("The Movie was added successfully!")
      }
      console.log(result)
      navigate(`/movieDetails/${result.data.id}`);
      setAlertOpen(true);
      props.setIsNew(false);
    });
  }

  return (
    <>
      {props.selectedMovie && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} xl={props.isNew ? 6 : 4}>
              <Card
                sx={{
                  marginLeft: theme.spacing(1),
                  marginRight: theme.spacing(1),
                }}
                elevation={0}
              >
                <TextField
                  id="title"
                  label="Title"
                  value={props.selectedMovie.title}
                  sx={{ my: theme.spacing(2) }}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  onChange={handleTextChange}
                />

                <CardMedia
                  component="img"
                  alt="movie poster"
                  image={props.selectedMovie.posterImage}
                />

                <CardContent>
                  <TextField
                    id="runtime"
                    label="Runtime"
                    value={props.selectedMovie.runtime}
                    sx={{ my: theme.spacing(1) }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={handleTextChange}
                  />
                  <TextField
                    id="writer"
                    label="Writer"
                    value={props.selectedMovie.writer}
                    sx={{ my: theme.spacing(1) }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={handleTextChange}
                  />
                  <TextField
                    id="actors"
                    label="Actors"
                    value={props.selectedMovie.actors}
                    sx={{ my: theme.spacing(1) }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={handleTextChange}
                  />
                  <TextField
                    id="genre"
                    label="Genre"
                    value={props.selectedMovie.genre}
                    sx={{ my: theme.spacing(1) }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={handleTextChange}
                  />
                  <TextField
                    id="rated"
                    label="Age Rating"
                    value={props.selectedMovie.rated}
                    sx={{ my: theme.spacing(1) }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={handleTextChange}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} xl={props.isNew ? 6 : 4}>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderBottomWidth: "0.2rem" }}
              />
              <Box
                sx={{
                  marginTop: theme.spacing(1),
                  marginLeft: theme.spacing(1),
                  marginRight: theme.spacing(1),
                }}
              >
                <Card
                  sx={{
                    marginLeft: theme.spacing(1),
                    marginRight: theme.spacing(1),
                    marginTop: theme.spacing(10),
                    overflowY: "auto",
                  }}
                  elevation={0}
                >
                  <TextField
                    id="plot"
                    label="Plot"
                    value={props.selectedMovie.plot}
                    sx={{ my: theme.spacing(2) }}
                    fullWidth
                    multiline
                    InputLabelProps={{ shrink: true }}
                    onChange={handleTextChange}
                  />
                </Card>
                {props.selectedMovie.trailer && (
                  <Card
                    sx={{
                      marginTop: theme.spacing(1),
                    }}
                    elevation={0}
                  >
                    <Youtube
                      videoId={props.selectedMovie.trailer.key}
                      opts={{ width: "100%", outerHeight: "56.25%" }}
                    />
                  </Card>
                )}
                {props.isNew && (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleAddNewMovie()}
                    sx={{ marginBottom: theme.spacing(2) }}
                    startIcon={<AddIcon />}
                  >
                    Add new Movie
                  </Button>
                )}
                <Snackbar open={alertOpen} sx={{ width: "70%" }} autoHideDuration={4000} onClose={handleAlertClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                  {!isError ?
                    <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                      {alertText}
                    </Alert>
                    :
                    <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
                      {alertText}
                    </Alert>}
                </Snackbar>
                {!props.isNew && (
                  <>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleUpdateMovie}
                      sx={{ marginBottom: theme.spacing(2) }}
                      startIcon={<UpdateIcon />}
                    >
                      Update Movie
                    </Button>
                    <Dialog
                      fullScreen={fullScreen}
                      open={dialogOpen}
                      onClose={() => setDialogOpen(false)}
                      aria-labelledby="responsive-dialog-title"
                    >
                      <DialogTitle id="responsive-dialog-title">
                        Deleting Movie
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Are you sure you want to delete this Movie from our Database?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleDeleteMovie} autoFocus startIcon={<DeleteForeverIcon />}>
                          Delete
                        </Button>
                        <Button autoFocus onClick={() => setDialogOpen(false)} variant="contained">
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => setDialogOpen(true)}
                      sx={{ marginBottom: theme.spacing(2) }}
                      startIcon={<DeleteForeverIcon />}
                    >
                      Delete Movie
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
            {!props.isNew && (
              <Grid item xs={12} sm={12} md={12} xl={4}>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderBottomWidth: "0.2rem" }}
                />
                <Box sx={{ marginTop: theme.spacing(1) }}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={6} xl={6}>
                      <Typography
                        variant="h4"
                        sx={{
                          p: theme.spacing(3),
                          paddingLeft: theme.spacing(2),
                        }}
                      >
                        Shows
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} xl={6}>
                      <Box>
                        <Button
                          variant="contained"
                          onClick={() => handleButtonCklick("addNewShow")}
                          startIcon={<AddIcon />}
                          sx={{
                            m: theme.spacing(3),
                          }}
                        >
                          Add new Show
                        </Button>

                      </Box>
                    </Grid>
                  </Grid>
                  <ShowDetails
                    showData={props.showData}
                    setShowData={props.setShowData}
                    selectedMovie={props.selectedMovie}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      )}

      {!props.selectedMovie && (
        <Alert
          sx={{ marginTop: "1rem", width: "90rem", marginLeft: "2rem" }}
          severity="error"
        >
          Currently there is no data available
        </Alert>
      )}
    </>
  );
}

export default AdminMovieDetailsView;
