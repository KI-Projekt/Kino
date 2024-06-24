import 'bootstrap/dist/css/bootstrap.min.css';
import MovieTile from '../../components/OverviewView/MovieTile';
import { Typography, useTheme } from '@mui/material';
import { Movie } from '../../interfaces/Interfaces';



interface TilebarProps {
    title: string,
    movies?: Movie[],
    isAdmin: boolean,
    isNew: boolean,
}

function TileBar(props: TilebarProps) {
    const theme = useTheme();

    return (
        <>
            {props.movies &&
                <>
                    <Typography variant="h4" sx={{ padding: theme.spacing(1), paddingLeft: theme.spacing(3), paddingTop: theme.spacing(2) }}>{props.title}</Typography>
                    <div className='overflow-x-auto flex-nowrap flex flex-row mb-4'>
                        {props.movies.map((item: Movie) => (
                            <MovieTile picture={item.posterImage ?? ""} id={item.id ?? 0} isAdmin={props.isAdmin} isNew={props.isNew} />
                        ))}
                    </div>
                </>
            }
            </>
    );

}
export default TileBar;