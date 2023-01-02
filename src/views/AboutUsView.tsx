import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import "../styles/AboutUsView.css";
import * as React from "react";
import SeatNr12 from "../img/oneSeat.jpg";

interface Props {}

interface State {}

class AboutUsView extends React.Component<Props, State> {
  render() {
    return (
      <Grid container spacing={2} columns={20}>
        <Grid item xs={20} sm={20} md={7} lg={10} xl={10}>
          <Container className="Container-Left">
            <Typography className="Headline" variant="h4">
              About Us
            </Typography>
            <Typography className="Text-Left">
              The Cinetastic Cinema can now look back on almost two semesters of
              history. The first performances took place at the DHBW Mannheim.
              The seats were ordinary but much too hard wooden chairs. A lecture
              room served as the performance space, which had to be rearranged
              each time. If you bear in mind that the films were presented with
              a portable projector, you get an idea of the atmosphere at that
              time. Nowadays, it didn't change at all - still painful chairs.
            </Typography>
            <Typography fontWeight="bold">
              <br /> <br />
              Why do we make cinema? <br /> <br />
            </Typography>
            <Typography>
              We want to keep our cinema open as a place to meet and experience
              film together. We also want to reach out to people who have not
              yet engaged with the creativity and magic of cinema.
            </Typography>
          </Container>
        </Grid>
        <Grid item xs={20} sm={20} md={13} lg={10} xl={10}>
          <Box>
            <img className="Image-Right" src={SeatNr12} alt="seat" />
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default AboutUsView;
