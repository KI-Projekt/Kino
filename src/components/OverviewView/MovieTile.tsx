import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/OverviewView.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

export interface MovieProps {
    picture: string,
    id: number | string,
    isAdmin: boolean,
    isNew: boolean,
}

function MovieTile(props: MovieProps) {

    const navigate = useNavigate()

    function handleOnClick() {
        props.isNew ? navigate(`/movieDetails/${props.id}/new`) : navigate(`/movieDetails/${props.id}`);
    }

    return (
        <div className='image-container d-flex justify-content-start m-3'>
            <img src={props.picture} alt="movie" className='Movie-Tile' />
            <div className="overlay d-flex align-items-center justify-content-center" >
                <Button
                    startIcon={props.isAdmin ? <EditIcon /> : <LocalActivityIcon />}
                    onClick={() => handleOnClick()}
                >
                    {props.isAdmin ? "Details" : "Tickets"}
                </Button>
            </div>
        </div>
    );
}

export default MovieTile;