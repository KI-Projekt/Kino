import { Chip, FormControl, Rating, TextField } from "@mui/material";
import * as React from "react";

function MovieReview(props: any) {
  const [tags, setTags] = React.useState<Array<String>>([]);
  const [inputValue, setInputValue] = React.useState('');

  const handleKeyDownEnter = (event:any) => {
    if (event.key === 'Enter') {
      // Trigger your function here
      if (inputValue === '') {
        return;
      }
      setTags([...tags, inputValue]);
      setInputValue('');
    }
  };
  const handleInputChange = (event:any) => {
    setInputValue(event.target.value);
  };


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
        {tags.length <2  &&
        <TextField id="filled-basic" label="Tags" variant="filled" value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDownEnter} />}

      </div>
    </div>
  );
}

export default MovieReview;
