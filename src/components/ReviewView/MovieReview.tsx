import { Chip, Rating, TextField } from "@mui/material";
import * as React from "react";

function MovieReview(props: any) {
  const [tags, setTags] = React.useState<Array<String>>([]);
  return (
    <div className="flex flex-row justify-around items-center my-2">
      <div className="max-h-[250px]">
        <img
          className="max-h-[250px]"
          src={props.movie.image}
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
          value={props.movie.rating}
        />
      </div>
      <div className="flex flex-col">
        <div className="mb-1">
          {tags.map((tag) => {
            return <Chip label={tag} variant="outlined" />;
          })}
        </div>
        <TextField id="filled-basic" label="Tags" variant="filled" onAbort={()=>console.log("test")} />
      </div>
    </div>
  );
}

export default MovieReview;
