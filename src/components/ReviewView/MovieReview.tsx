import { Alert, Button, Chip, Rating, Snackbar, TextField } from "@mui/material";
import * as React from "react";
import { ReviewArrayTags } from "../../interfaces/InterfacesReview";
import { addReview } from "../../queries/fetchReview";

function MovieReview(props: any) {
  const [tags, setTags] = React.useState<Array<String>>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [snackBarOpen, setSnackbarOpen] = React.useState(false);
  const [sended, setSended] = React.useState(false);

  const handleKeyDownEnter = (event: any) => {
    if (event.key === 'Enter') {
      // Trigger your function here
      if (inputValue === '') {
        return;
      }
      setTags([...tags, inputValue]);
      setInputValue('');

      
    }
  };
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleSnackBarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackBarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  }

  const handleSubmit = async() => {
    const review:ReviewArrayTags = {
      rating: rating,
      tags: tags,
      movieId: props.movie.id,
      userId: props.userId,
    };
    if (review.rating === 0) {
      return;
    }
    console.log(review);
    
    const response = await addReview(review);
    if (response.status === 201) {
      handleSnackBarOpen();
      setSended(true);
    }
  }



  return (
    <div className="flex flex-row w-full justify-between items-center my-2" hidden={sended}>
      <div className="max-h-[250px]">
        <img
          className="max-h-[250px]"
          src={props.movie.posterImage}
          alt={props.movie.title}
        />
      </div>
      <div>
        <p className="font-bold">{props.movie.title}</p>
      </div>
      <div>
        <p>{props.movie.genre.toString()}</p>
      </div>
      <div>
        <Rating
          name="no-value"
          precision={0.5}
          size="large"
          value={rating}
          onChange={(event, newValue) => {
            setRating(Number(newValue));
          }}
        />
      </div>
      <div className="flex flex-col w-[200px]">
        <div className="mb-1">
          {tags.map((tag) => {
            return <Chip label={tag} variant="outlined" />;
          })}
        </div>
        {tags.length < 2 &&
        <div className="flex flex-row">
          <TextField id="filled-basic" label="Tags" helperText='Press "Enter" to add' variant="filled" value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDownEnter}/>
            </div>}

      </div>
      <div className="">
      <Button onClick={handleSubmit} variant="contained">Send</Button>
      </div>
      <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackBarClose}>
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Review saved!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default MovieReview;
