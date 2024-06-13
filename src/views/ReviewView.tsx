import * as React from "react";
import MovieReview from "../components/ReviewView/MovieReview";
import { Button, Divider } from "@mui/material";
import GenreSelect from "../components/ReviewView/GenreSelect";
import { User } from "../interfaces/Interfaces";
import { useNavigate } from "react-router-dom";
import DsgvoDialog from "../components/Ai/DsgvoDialog";

interface ReviewProps {
  user?: User;
}


const movies = [
  {
    title: "The Godfather",
    rating: 5,
    genre: ["Crime", "Drama"],
    image: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
  },
  {
    title: "Marvel's The Avengers",
    rating: 2.0,
    genre: ["Action", "Abenteuer"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/f/f9/TheAvengers2012Poster.jpg",
  },
  {
    title: "The Shawshank Redemption",
    rating: 4.5,
    genre: ["Drama"],
    image:
      "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
  },
];

function Review(props:ReviewProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!props.user?.aiAccepted) {
      setOpen(true);
    }
  }
  ,[props.user?.aiAccepted]);

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
      <GenreSelect />
      <h1 className="text-xl font-bold">Please review these movies so we can get to know you better:</h1>
      {movies.map((movie) => {
        return (
          <div>
            <MovieReview key={movie.title} movie={movie} />
            <Divider />
          </div>
        );
      })}
      <div className=" flex w-full justify-end m-2">
        <Button style={{marginRight: 10}} size="large" variant="contained">send reviews</Button>
      </div>
      <div className="h-1">

      </div>
      <DsgvoDialog open={open} onClose={handleClose}/>
    </div>
  );
}

export default Review;
