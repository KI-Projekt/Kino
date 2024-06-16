import * as React from "react";
import MovieReview from "../components/ReviewView/MovieReview";
import { Divider } from "@mui/material";
import GenreSelect from "../components/ReviewView/GenreSelect";
import { Movie, User } from "../interfaces/Interfaces";
import { useNavigate } from "react-router-dom";
import DsgvoDialog from "../components/Ai/DsgvoDialog";
import { getMoviesForReview } from "../queries/fetchReview";

interface ReviewProps {
  user?: User;
}


function Review(props:ReviewProps) {
  const [open, setOpen] = React.useState(true);
  const [movies, setMovies] = React.useState<Movie[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      setMovies(await getMoviesForReview(props.user?.id ?? 0))
      
    }
    fetchData();
  }
  ,[]);


  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (!props.user?.id) {
      navigate("/");
    }
}, [props.user?.id, navigate]);
  return (
    <div>
        <div className="h-2"></div>
         <h1 className="text-3xl font-bold text-center">Review for MoviemateAI</h1>
         <p>So that we can offer you a unique movie experience and our AI only suggests movies that you really want to see, we ask for your help. Tell us your favorites and rate a few old films in advance.</p>
       
        <h1 className="text-xl font-bold">Slecet your favorite Genres:</h1>
      <GenreSelect userId={props.user?.id ?? 0}/>
      <h1 className="text-xl font-bold">Please review these movies so we can get to know you better:</h1>
      {movies.map((movie) => {
        return (
          <div>
            <MovieReview key={movie.title} movie={movie} userId={props.user?.id} />
            <Divider />
          </div>
        );
      })}
      {!props.user?.aiAccepted && <DsgvoDialog userId={props.user?.id} open={open} onClose={handleClose}/>}
      
    </div>
  );
}

export default Review;
