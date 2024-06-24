import * as React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";

export interface MovieProps {
  picture: string;
  id: number | string;
  isAdmin: boolean;
  isNew: boolean;
}

function MovieTile(props: MovieProps) {
  const navigate = useNavigate();

  function handleOnClick() {
    props.isNew
      ? navigate(`/movieDetails/${props.id}/new`)
      : navigate(`/movieDetails/${props.id}`);
  }

  return (
    <div
      className="relative transition duration-100 hover:scale-110 hover:opacity-100 hover:cursor-pointer flex justify-start m-3 min-w-[162px] max-h-[241px] max-w-[168px]"
      onClick={() => handleOnClick()}
    >
      <img src={props.picture} alt="movie" className="Movie-Tile" />
      <div className="absolute transition ease-in-out  hover:bg-black hover:text-red-700 text-transparent duration-300  w-full bottom-0 text-xl text-center p-5 flex items-center justify-center h-1/3">
      <div className="flex flex-row">
          <div className="mr-2 ">{props.isAdmin ? <EditIcon /> : <LocalActivityIcon />}</div>
          {props.isAdmin ? "Details" : "Tickets"}
        </div>
      </div>
    </div>
  );
}

export default MovieTile;



