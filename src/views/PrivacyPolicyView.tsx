import {
  CardActionArea,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
} from "@mui/material";
import * as React from "react";
import "../styles/PrivacyPolicyView.css";
import CinetastischHorizontal from "../img/Cinetastisch_horizontal.png";

interface Props {}

interface State {}

class PrivacyPolicyView extends React.Component<Props, State> {
  render() {
    return (
      <Container>
        <Card className="PrivacyPolicy-Card" sx={{ maxWidth: 1000 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height=""
              image={CinetastischHorizontal}
              alt="logo_horizontal"
            ></CardMedia>
            <CardContent>
              <Typography variant="h4">Privacy Policy</Typography>
              <Typography fontWeight="Bold">
                <br />
                Digital Web and Mobile Privacy Statement
              </Typography>
              <Typography>
                Cinetastisch Entertainment is committed to the right to privacy,
                including the digital privacy through web and mobile services.
                This privacy statement concerns the collection and use of
                information collected through official Cinetastisch
                Entertainment websites and other digital channels.
              </Typography>
              <Typography fontWeight="Bold">
                <br />
                Gathering and Use of Information
              </Typography>
              <Typography
                textTransform="uppercase"
                sx={{ textDecoration: "underline" }}
              >
                Personally Identifiable Information
              </Typography>
              <Typography>
                Personally identifiable information (PII) will not be collected
                while you visit websites or other digital channels of
                Cinetastisch Entertainment Cinema unless voluntarily provided by
                you. You may be requested to provide personally identifiable
                information when accessing academic records, password-protected
                websites, joining mailing lists, or engaging in payment
                transactions with the Cinema. This information may be used for
                related purposes, including responding to requests for
                information or services, or communicating information that may
                be of value or interest to you. Your information will not be
                shared by Cinetastisch Entertainment with third parties.
              </Typography>
              <Typography
                textTransform="uppercase"
                sx={{ textDecoration: "underline" }}
              >
                <br />
                Non-Personally Identifiable Information
              </Typography>
              <Typography>
                Depending on the type and use of your web browser, information
                may be given by your web browser and collected into server logs
                by the Cinema while you visit Cinetastisch Entertainment
                websites and other digital properties, including IP addresses.
                Standard information about your computer, including the type of
                web browser and operating system in use, may also be collected.
                Your usage of Cinetastisch Entertainment websites and digital
                properties, such as pages visited, search queries, and length of
                visits, may also be collected. This information is
                non-personally identifiable information and can be used to help
                diagnose technical issues and suggest digital solutions for
                improving Cinetastisch Entertainment websites and other digital
                channels.
                <br />
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    );
  }
}

export default PrivacyPolicyView;
