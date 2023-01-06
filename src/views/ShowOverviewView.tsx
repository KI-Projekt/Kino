import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Show, ShowDate } from '../components/MovieDetailsView/ShowTiles';
import MovieShowTiles from '../components/ShowOverviewView/MovieShowTiles';
import { fetchAllScreenings } from "../queries/fetchScreenings";
import { sortShowsToShowDate } from './MovieDetailsView';


interface ShowOverviewViewProps {
    isAdmin: boolean;
}

function ShowOverviewView(props: ShowOverviewViewProps) {

    const [allShows, setAllShows] = React.useState<Array<ShowDate> | undefined>(undefined)

    const navigate = useNavigate();

    React.useEffect(() => {
        fetchAllScreenings(new Date(Date.now()).toISOString().replace('Z', '')).then(result => {
            setAllShows(sortShowsToShowDate(result));
        })
    }, [])


    const onMovieShowTileClick = (currentShow: Show) => {
        if (props.isAdmin) {
            navigate(`/movieDetails/${currentShow.movieID}`)
        } else {
            navigate(`/movieDetails/${currentShow.movieID}/${currentShow.showID}`);
        }
    }

    return (
        <>
            {allShows && <MovieShowTiles shows={allShows} onShowTileClick={onMovieShowTileClick} />}
        </>
    );
}

export default ShowOverviewView;