import * as React from 'react';
import "../styles/Footer.css";
import { Container, Grid, Box, Link, Typography }from '@mui/material/';
import InfoIcon from '@mui/icons-material/Info';
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Footer(){
    return <div>
        <Box className="footerBox">
            <Container className="footerContainer" sx={{width:'100%'}}>
                <Grid container spacing={0} direction="row"  justifyContent="center"  alignItems="center">
                    <Grid item xs={4} sm={4}>
                    </Grid>
                    <Grid  item xs={4} sm={4}>
                        <Box>
                            <Typography align='center'> <InfoIcon className='FooterIcons' fontSize='large'></InfoIcon> <AssistantDirectionIcon className='FooterIcons' fontSize='large'></AssistantDirectionIcon><AccountCircleIcon className='FooterIcons' fontSize='large'></AccountCircleIcon></Typography>
                            <Typography align='center'>
                                <Link className="FooterLink" href="/" color="inherit" underline="none" variant="subtitle2">
                                    Info ᛫
                                </Link>
                                <Link className="FooterLink" href="/" color="inherit" underline="none" variant="subtitle2">
                                    Support ᛫
                                </Link>
                                <Link className="FooterLink" href="/" color="inherit" underline="none" variant="subtitle2">
                                    Marketing
                                </Link>
                            </Typography>
                        </Box>
                        
                        <Box>
                            <Typography align='center'>
                            <Link className="FooterLink" href="/" color="inherit" underline="none" variant="subtitle2" >
                                Terms of Use ᛫
                            </Link>
                            <Link className="FooterLink" href="/" color="inherit" underline="none" variant="subtitle2" >
                                Privacy Policy
                            </Link>
                            </Typography>
                        </Box>
                        <Box>
                            <Typography className='LowestFooterBox'variant='subtitle2' align='center'>
                                &copy; {new Date().getFullYear()} Cinetastisch Entertainment
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </div>
}