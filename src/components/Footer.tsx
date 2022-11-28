import * as React from 'react';
import "../styles/Footer.css";
import { Container, Grid, Box, Link, Typography }from '@mui/material/';

export default function Footer(){
    return <div>
        <Box className="footerBox">
            <Container className="footerContainer" sx={{width:'100%'}}>
                <Grid container spacing={0} direction="row"  justifyContent="center"  alignItems="center">
                    <Grid item xs={4} sm={4}>
                    </Grid>
                    <Grid  item xs={4} sm={4}>
                        <Box>
                            <Typography align='center'>
                                <Link className="FooterLink" href="/" color="inherit" underline="none" variant="overline">
                                    Info
                                </Link>
                                <Link className="FooterLink" href="/" color="inherit" underline="none" variant="overline">
                                    Support
                                </Link>
                                <Link className="FooterLink" href="/" color="inherit" underline="none" variant="overline">
                                    Marketing
                                </Link>
                            </Typography>
                        </Box>
                        <Box>
                            <Typography align='center'>
                            <Link href="/" color="inherit" underline="none" variant="overline" >
                                Terms of Use
                            </Link>
                            </Typography>
                        </Box>
                        <Box>
                            <Typography className='LowestFooterBox'variant='subtitle2' align='center'>
                                &copy;{new Date().getFullYear()} Cinetastisch Entertainment
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