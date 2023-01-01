import * as React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Youtube from "react-youtube";
import ShowTiles, { Show, ShowDate } from "./ShowTiles";
import { Movie } from "../../views/MovieDetailsView";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
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
    //POST an Movie API schicken und dann
    props.setIsNew(false);
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
                  id="Title"
                  label="Title"
                  value={props.selectedMovie.Title}
                  sx={{ my: theme.spacing(2) }}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  onChange={handleTextChange}
                />

                <CardMedia
                  component="img"
                  alt="movie poster"
                  image={props.selectedMovie.Poster}
                />

                <CardContent>
                  <TextField
                    id="Runtime"
                    label="Runtime"
                    value={props.selectedMovie.Runtime}
                    sx={{ my: theme.spacing(1) }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={handleTextChange}
                  />
                  <TextField
                    id="Writer"
                    label="Writer"
                    value={props.selectedMovie.Writer}
                    sx={{ my: theme.spacing(1) }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={handleTextChange}
                  />
                  <TextField
                    id="Actors"
                    label="Actors"
                    value={props.selectedMovie.Actors}
                    sx={{ my: theme.spacing(1) }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={handleTextChange}
                  />
                  <TextField
                    id="Genre"
                    label="Genre"
                    value={props.selectedMovie.Genre}
                    sx={{ my: theme.spacing(1) }}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={handleTextChange}
                  />
                  <TextField
                    id="Rated"
                    label="Age Rating"
                    value={props.selectedMovie.Rated}
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
                    id="Plot"
                    label="Plot"
                    value={props.selectedMovie.Plot}
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
                  >
                    Add new Movie
                  </Button>
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
