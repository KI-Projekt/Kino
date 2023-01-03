import {
  CardActionArea,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
} from "@mui/material";
import * as React from "react";
import "../styles/Impressum.css";
import CinetastischHorizontal from "../img/Cinetastisch_horizontal.png";

interface Props {}

interface State {}

class ImpressumView extends React.Component<Props, State> {
  render() {
    return (
      <Container>
        <Card className="Impressum-Card" sx={{ maxWidth: 500 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height=""
              image={CinetastischHorizontal}
              alt="logo_horizontal"
            ></CardMedia>
            <CardContent>
              <Typography variant="h5">Impressum</Typography>
              <Typography>
                <br />
                Cinetastisch GmbH <br />
                Cinema Street 11 <br />
                68161 Mannheim <br /> <br />
                Tel: +49 123 45 67 890 <br />
                Tax: +49 098 7 65 43 <br /> <br />
                Email: office@cinetastisch.de <br />
                Homepage: www.cinetastisch.de <br /> <br />
                Managing director authorised to represent the company: Richarda
                Rich <br />
                Register court: Local Court Mannheim - Dept. B <br />
                Registration number: 1234 <br />
                Sales tax identification number according to § 27a
                Umsatzsteuergesetz: 38180/33800 <br />
                Responsible for content according to §6 MDStV: Richarda Rich{" "}
                <br /> <br />
                Disclaimer: Despite careful control of the contents, we do not
                assume any liability for the contents of external links. The
                operators of the linked pages are solely responsible for their
                content.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    );
  }
}

export default ImpressumView;
