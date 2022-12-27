import { Box, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdminProps } from '../App';
import TileBar from '../components/OverviewView/Tilebar';
import AddIcon from '@mui/icons-material/Add';

function OverviewView(adminProps: AdminProps) {

    const navigate = useNavigate();

    const handleButtonCklick = (
        link: String,
    ) => {
        navigate(`/${link}`);
    };

    const theme = useTheme();

    return (
        <div>
            {adminProps.isAdmin &&
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
            <TileBar title='Star Wars' query='Star Wars' adminProps={adminProps} />
            <TileBar title='Marvel' query='Marvel' adminProps={adminProps} />
            <TileBar title='Harry Potter' query='Harry Potter' adminProps={adminProps} />

        </div>
    );
}


export default OverviewView;


