import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import * as React from "react";
import { findDifference } from "./HelperFunctions";
import { addFavoriteGerne } from "../../queries/fetchReview";

function GenreSelect(props: {userId: number}) {
  const [formats, setFormats] = React.useState<Array<string>>(() => []);
  const genreTop = ["animation", "documentary", "fantasy", "mystery", "war", "crime", "adventure","sport"];
  const genreBottm = ["action", "comedy", "drama", "horror", "romance", "sci_fi", "thriller", "western"]
  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {

    const difference = findDifference(formats, newFormats);
    addFavoriteGenre(difference ?? "")
    setFormats(newFormats);
  };

  const addFavoriteGenre = async (genre: string) => {
    await addFavoriteGerne(props.userId, genre);
  }
  return (
    <div className="flex flex-col justify-start items-start ">
      <ToggleButtonGroup
        style={{marginBottom: "1rem"}}
        value={formats}
        color="error"
        onChange={handleFormat}
        aria-label="text formatting"
      >
        {genreTop.map((genre) => {
          return (
            <ToggleButton key={genre} value={genre} aria-label={genre}>
              {genre}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        color="error"
      >
        {genreBottm.map((genre) => {
          return (
            <ToggleButton key={genre}  value={genre} aria-label={genre}>
              {genre}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </div>
  );
}

export default GenreSelect;
