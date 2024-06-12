import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";

interface AddReviewProps {
    dialogOpen: boolean,
    setDialogOpen: Function,
    onSaveReviewClick: Function
}

function AddReview(props: AddReviewProps) {
  const [value, setValue] = React.useState<number | null>(4);


  return (
    <Dialog open={props.dialogOpen} onClose={()=> props.setDialogOpen(false)}>
      <DialogTitle id="titleMovieRating">Rate the movies you've seen so we can get to know your preferences
      better.</DialogTitle>
      <DialogContent>
        <Typography component="legend">Star Rating</Typography>
        <Rating
          name="simple-rating"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <DialogContentText>Note keywords about the movie</DialogContentText>
        <TextField id="textfield-tags" label="Tags" variant="outlined" />
      </DialogContent>
      <DialogActions>
        <Button onClick={()=> props.onSaveReviewClick()} variant="contained">
          Save rating
        </Button>
        <Button onClick={()=> props.setDialogOpen(false)} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default AddReview;
