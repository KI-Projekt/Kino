import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/OverviewView.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { AdminProps } from '../../App';

interface MovieProps {
    picture: string,
    imdbID: string,
    adminProps: AdminProps
}

function MovieTile(props: MovieProps) {

    const navigate = useNavigate()

    return (
        <div className='image-container d-flex justify-content-start m-3'>
            <img src={props.picture} alt="movie" className='Movie-Tile' />
            <div className="overlay d-flex align-items-center justify-content-center" >
                <Button
                    startIcon={props.adminProps.isAdmin ? <EditIcon /> : <LocalActivityIcon />}
                    onClick={() => { navigate(`/movieDetails/${props.imdbID}`) }}
                >
                    {props.adminProps.isAdmin ? "Details" : "Tickets"}
                </Button>
            </div>
        </div>
    );
}

export default MovieTile;