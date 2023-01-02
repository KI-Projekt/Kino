import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import * as React from "react";
import Map from "../components/MapView/MapComponent";
import "../styles/GettingHereView.css";

interface Props {}

interface State {}

class GettingHereView extends React.Component<Props, State> {
  render() {
    return (
      <Container>
        <Card className="GettingHere-Card" sx={{ maxWidth: 700 }}>
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
