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

interface AddReviewProps {
  dialogOpen: boolean;
  setDialogOpen: Function;
  onSaveReviewClick: Function;
}

function AddReview(props: AddReviewProps) {
  const [value, setValue] = React.useState<number | null>(0);
  const [tags, setTags] = React.useState<Array<String>>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [counterTags, setCounterTags] = React.useState(1);
  const [writeTags, setWriteTags] = React.useState(false);

  const handleKeyDownEnter = (event: any) => {
    if (event.key === "Enter") {
      if (inputValue === "") {
        return;
      }
      setTags([...tags, inputValue]);
      setInputValue("");
      setCounterTags(counterTags+1);
      if (counterTags === 2) {
        setWriteTags(true);
      }
    }
  };
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <Dialog open={props.dialogOpen} onClose={() => props.setDialogOpen(false)}>
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
            return <Chip label={tag} variant="outlined"/>
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
        <Button onClick={() => props.setDialogOpen(false)} variant="outlined">
          Cancel
        </Button>
        <Button onClick={() => props.onSaveReviewClick()} variant="contained">
          Save rating
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default AddReview;
