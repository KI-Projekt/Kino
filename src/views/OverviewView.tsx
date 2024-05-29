import { Box, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TileBar from '../components/OverviewView/Tilebar';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';
import AIComingSOON from '../img/AIComingSoon.png'

interface OverviewViewProps {
    isAdmin: boolean,
    isNew: boolean,
    setIsNew: Function,
}

function OverviewView(props: OverviewViewProps) {

    const navigate = useNavigate();

    const handleButtonCklick = (
        link: String,
    ) => {
        navigate(`/${link}`);
    };

    const theme = useTheme();

    useEffect(() => {
        props.setIsNew(false);
    });

    return (
        <div>
            <img src={AIComingSOON} alt="" />
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
            <TileBar title='All Movies in this Cinema' isAdmin={props.isAdmin} isNew={props.isNew} />
            {props.isAdmin &&<TileBar title='Archived Movies' status="ARCHIVED" isAdmin={props.isAdmin} isNew={props.isNew} />}
        </div>
    );
}


export default OverviewView;


