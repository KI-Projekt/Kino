import { Box, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TileBar from '../components/OverviewView/Tilebar';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { Movie, User } from '../interfaces/Interfaces';
import { fetchAiMovies, fetchAllArchivedMovies, fetchAllMovies } from '../queries/fetchMovieAPI';
import Alerts from '../components/Alerts';
import { AiScore } from '../interfaces/InterfacesReview';
import SwipeableTextMobileStepper from '../components/OverviewView/carusel';
import AiStartNow from '../img/AiStartNow.png';

interface OverviewViewProps {
    isAdmin: boolean,
    isNew: boolean,
    setIsNew: Function,
    user?: User
}

function OverviewView(props: OverviewViewProps) {
    const [topMovies, setTopMovies] = useState<Movie[]>([]);
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [ArchivedMovies, setArchivedMovies] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [aiScores, setAiScores] = useState<AiScore>();

    const navigate = useNavigate();

    const handleButtonCklick = (
        link: String,
    ) => {
        navigate(`/${link}`);
    };


    useEffect(() => {
        if (props.isAdmin) {
            fetchAllArchivedMovies().then(result => setArchivedMovies(result))
        }
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
        if (props.user && props.user.aiAccepted) {
            fetchAiMovies(props.user?.id ?? 0).then((result) => {if (result) { setAiScores(result) }})

        }
    }, [props.isAdmin, props.user]);

    useEffect(() => {
        if (aiScores?.body && aiScores.body.length > 0) {

            const sortedScores = aiScores.body.sort((a, b) => b.score - a.score)
            console.log(sortedScores)
            const topScores = sortedScores.slice(0, 4)

            // Erstelle eine Map von MovieId zu Score
            const scoreMap = new Map<number, number>(topScores.map(score => [score.externalId, score.score]));

            // Filtern Sie die Filme nach den IDs in topScores und fügen Sie den Score hinzu
            const topMovies = movies
                .filter(movie => scoreMap.has(movie.id ?? 0))
                .map(movie => ({
                    ...movie,
                    score: scoreMap.get(movie.id ?? 0) as number // Typ-Assertion, dass score immer einen Wert hat
                }));

            setTopMovies(topMovies);


        }
    }, [aiScores, movies])

    const theme = useTheme();

    useEffect(() => {
        props.setIsNew(false);
    });

    return (
        <>
            <div>
                {(!props.user || !props.user?.aiAccepted) && <img src={AiStartNow} alt="" />}
                {props.isAdmin &&
                    <Box textAlign='center' sx={{ pt: theme.spacing(3) }}>
                        <Button
                            variant='contained'
                            onClick={() => handleButtonCklick("addNewMovie")}
                            startIcon={<AddIcon />}
                        >
                            Add new Movie
                        </Button>
                    </Box>
                }
                {aiScores && topMovies.length > 0 && props.user && props.user.aiAccepted && <SwipeableTextMobileStepper movies={topMovies} />}
                <TileBar title='All Movies in this Cinema' isAdmin={props.isAdmin} isNew={props.isNew} movies={movies} />
                {props.isAdmin && <TileBar title='Archived Movies' isAdmin={props.isAdmin} isNew={props.isNew} movies={ArchivedMovies} />}
            </div>
            <Alerts alertOpen={alertOpen} alertText={alertText} isError={isError} setAlertOpen={setAlertOpen} />
        </>
    );
}


export default OverviewView;


