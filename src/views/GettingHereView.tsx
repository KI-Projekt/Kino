import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import * as React from "react";
import Map from "../components/MapView/MapComponent";
import { redTheme } from "../interfaces/Theme";



class GettingHereView extends React.Component {
  render() {
    return (
      <Container sx={{ p: redTheme.spacing(3) }}>
        <Card className="m-auto py-4" sx={{ maxWidth: 700, backgroundColor: redTheme.palette.common.white }}>
          <CardActionArea>
            <CardContent>
              <Map />
            </CardContent>
            <CardContent>
              <Typography variant="h5">
                Getting To Cinetastisch Entertainment Cinema
              </Typography>
              <Typography>
                <br />
                The Cinetastisch Entertainment Cinema is just 4.7 km from the
                Mannheim's center. We're served by excellent fast public
                transport links from the Mannheim main station, and are easily
                accessible by bus, foot and bike from the "Quadrate".
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    );
  }
}

export default GettingHereView;
