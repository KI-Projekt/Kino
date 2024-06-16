import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { addReview } from "../../queries/fetchReview";

interface AddReviewProps {
  userId: number | undefined;
  order: any;
}

function AddReview(props: AddReviewProps) {
  const [value, setValue] = React.useState<number | null>(0);
  const [tags, setTags] = React.useState<Array<String>>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [writeTags, setWriteTags] = React.useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = React.useState(false);

  const handleKeyDownEnter = (event: any) => {
    if (event.key === "Enter") {
      if (inputValue === "") {
        return;
      }
      setTags([...tags, inputValue]);
      setInputValue("");
      if (tags.length >= 1) {
        setWriteTags(true);
      }
    }
  };
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const onSaveReviewClick = async () => {
    const body = {
      rating: value,
      tags: tags,
      userId: props.userId,
      movieId: props.order?.tickets[0].screening.movie?.id ?? 0
    }
    if (body.userId === undefined) {
      return;
    }
    const response = await addReview(body);
    if (response.status === 201) {
      setReviewDialogOpen(false);
      setTags([]);
      setValue(0);
      setWriteTags(false);
    } else {
      console.log("Review not added");
    }

  }
  const handleClose = () => {
    setReviewDialogOpen(false);
    setTags([]);
    setValue(0);
    setWriteTags(false);
  }

  return (
    <React.Fragment>
      <Button variant='contained' sx={{ p: 5, width: "100%", height: 30 }} onClick={() => setReviewDialogOpen(true)}>Add Review</Button>
      <Dialog open={reviewDialogOpen} onClose={() => setReviewDialogOpen(false)}>
        <DialogTitle id="titleMovieRating">
          Rate the movies you've seen so we can get to know your preferences
          better.
        </DialogTitle>
        <DialogContent>
          <Typography component="legend" fontWeight={"medium"}>
            Star Rating
          </Typography>
          <Rating
            name="simple-rating"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <DialogContentText fontWeight={"bold"} paddingTop={5}>
            Note keywords about the movie, maximum 2 possible
          </DialogContentText>
          <div className="flex flex-col w-[10vw]">
            <Stack direction="row" spacing={2}>
              {tags.map((tag) => {
                return <Chip label={tag} variant="outlined" />
              })}
            </Stack>
            <FormControl defaultValue="">
              <TextField
                id="textfield-tags"
                label="Tags"
                variant="standard"
                disabled={writeTags}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDownEnter}
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={onSaveReviewClick} variant="contained">
            Save rating
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default AddReview;
