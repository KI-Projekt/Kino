import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Movie } from '../../interfaces/Interfaces';
import { useNavigate } from 'react-router-dom';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


function SwipeableTextMobileStepper(props: { movies: Movie[] }) {
    const navigate = useNavigate();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = props.movies.length;
    console.log(props.movies);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };
    function handleOnClick(id: number ) {
        navigate(`/movieDetails/${id}`);
      }

    return (
        <div className='mt-3'>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {props.movies.map((step, index) => (
                    <div key={step.id}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <div onClick={() =>handleOnClick(step.id ?? 0)} className='flex flex-row'>
                                
                                <img style={{
                                    height: 500,
                                    display: 'block',
                                    maxWidth: 400,
                                    overflow: 'hidden',
                                    width: '100%',
                                }}
                                    src={step.posterImage}
                                    alt={step.title?.toString()} />
                                <div className='flex flex-col p-10'>
                                    <div className='flex flex-row items-center'>
                                        <Typography variant='h5'>{step.title}</Typography>
                                        {step.score && step.score > 75 && <p className='text-green-500 font-bold text-4xl ml-3' >{step.score}%</p>}
                                        {step.score && step.score <= 75 && step.score >= 50 && <p className='text-yellow-600 font-bold text-4xl ml-3' >{step.score}%</p>}
                                        {step.score && step.score < 50 && <p className='text-red-600 font-bold text-4xl ml-3' >{step.score}%</p>}
                                    </div>
                                    <Typography variant='body1'>{step.plot}</Typography>
                                    <br/>
                                    <Typography variant='body1'>{step.releaseYear}</Typography>
                                    <Typography variant='body1'>{step.genre}</Typography>
                                    <br/>
                                    <Typography variant='body1'>{step.director}</Typography>
                                    <Typography variant='body1'>{step.actors}</Typography>
                                    <br/>
                                    <Typography variant='body1'>{step.runtime}</Typography>
                                </div>
                            </div>

                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </div>
    );
}

export default SwipeableTextMobileStepper;
