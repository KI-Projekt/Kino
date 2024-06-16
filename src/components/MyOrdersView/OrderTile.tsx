import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Order } from '../../interfaces/Interfaces';

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .mainTypography': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));
interface OrderTileProps {
    order: Order,
    onOrderTileClick: (order: Order) => void;
}

function OrderTile(props: OrderTileProps) {

    const theme = useTheme();

    React.useEffect(() => {
    },[props.order])
    return (
        <>
            <ImageButton
                onClick={() => props.onOrderTileClick(props.order)}
                focusRipple
                sx={{
                    width: {xs: theme.spacing(28) , md: theme.spacing(32)},
                    height: {xs: theme.spacing(39) , md: theme.spacing(43)},
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                }}
            >
                {props.order.tickets && <ImageSrc style={{ backgroundImage: `url(${props.order.tickets[0].screening.movie?.posterImage})` }} />}
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                    <Typography
                        className='mainTypography'
                        component="span"
                        color="inherit"
                        sx={{
                            position: 'relative',
                            p: theme.spacing(4),
                            pt: theme.spacing(2),
                            pb: (theme) => `calc(${theme.spacing(1)} + 0.6rem)`,
                        }}
                    >
                     {props.order.tickets &&
                            <>
                                <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
                                    {props.order.tickets[0].screening.movie?.title}
                                </Typography>
                                {props.order.tickets[0].screening.startDateTime && <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                    {new Date(props.order.tickets[0].screening.startDateTime).toDateString()}
                                </Typography>}
                                <Typography variant='body1'>
                                    {props.order.tickets[0].screening.room?.name}
                                </Typography>
                            </>
                        } 
                        <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                </Image>
            </ImageButton>
        </>
    );
}

export default OrderTile;