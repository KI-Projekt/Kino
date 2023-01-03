import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import * as React from "react";
import CinemaSeats from "../img/cinemaSeats.jpg";

interface Props {}

interface State {}

class ContactUsView extends React.Component<Props, State> {
  render() {
    return (
      <Container>
        <Card className="Impressum-Card" sx={{ maxWidth: 600 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height=""
              image={CinemaSeats}
              alt="cinema_seats"
            ></CardMedia>
            <CardContent>
              <Typography variant="h4">Contact Us</Typography>
              <Typography>
                <br />
                Cinetastisch GmbH <br />
                Cinema Street 11 <br />
                68161 Mannheim <br /> <br />
                Tel: +49 123 45 67 890 <br />
                Tax: +49 098 7 65 43 <br /> <br />
                Email: office@cinetastisch.de <br />
                Homepage: www.cinetastisch.de
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    );
  }
}

export default ContactUsView;
