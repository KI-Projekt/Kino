import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieTile from '../../components/OverviewView/MovieTile';
import { Typography, useTheme } from '@mui/material';
import { fetchAllArchivedMovies, fetchAllMovies, fetchMoviesByAgeRating } from '../../queries/fetchMovieAPI';
import Alerts from '../Alerts';

export interface MovieProps {
    posterImage: string,
    id: number | string,
}

interface TilebarProps {
    title: string,
    query?: string,
    status?: string,
    isAdmin: boolean,
    isNew: boolean,
}

function TileBar(props: TilebarProps) {
    const [movies, setMovies] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [alertText, setAlertText] = useState("");

    useEffect(() => {
        if (props.status === "ARCHIVED") {
            fetchAllArchivedMovies().then(result => setMovies(result))
        } else if (props.query) {
            fetchMoviesByAgeRating(props.query).then((result) => { setMovies(result) })
        } else {

            fetchAllMovies().then((result) => {
                if (result.error) {
                    setAlertText(result.error);
                    setIsError(true);
                    setAlertOpen(true)
                } else if (result.errorMessage) {
                    setAlertText(result.errorMessage);
                    setIsError(true);
                    setAlertOpen(true)

                } else {
                    setMovies(result)
                }
            })
        }
    }, [props.query, props.status]);

    const theme = useTheme();

    return (
        <>
            {movies &&
                <>
                    <Typography variant="h4" sx={{ padding: theme.spacing(1), paddingLeft: theme.spacing(3), paddingTop: theme.spacing(2) }}>{props.title}</Typography>
                    <div className='overflow-x-auto flex-nowrap flex flex-row mb-4'>
                        {movies.map((item: MovieProps) => (
                            <MovieTile picture={item.posterImage} id={item.id} isAdmin={props.isAdmin} isNew={props.isNew} />
                        ))}
                    </div>
                </>
            }
            <Alerts alertOpen={alertOpen} alertText={alertText} isError={isError} setAlertOpen={setAlertOpen} />
        </>
    );

}
export default TileBar;