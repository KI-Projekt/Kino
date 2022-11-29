import * as React from "react";
import "../styles/Footer.css";
import { Container, Grid, Box, Link, Typography } from "@mui/material/";
import InfoIcon from "@mui/icons-material/Info";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Footer() {
  return (
    <div>
      <Box className="Footer-Box">
        <Container className="footerContainer" sx={{ width: "100%" }}>
          <Grid
            container
            spacing={0}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={4} sm={4}></Grid>
            <Grid item xs={4} sm={4}>
              <Box>
                <Typography align="center">
                  <InfoIcon className="Footer-Icons"></InfoIcon>
                  <AssistantDirectionIcon className="Footer-Icons"></AssistantDirectionIcon>
                  <AccountCircleIcon className="Footer-Icons"></AccountCircleIcon>
                </Typography>
                <Typography align="center">
                  <Link
                    className="Footer-Link"
                    href="/"
                    color="inherit"
                    underline="none"
                    variant="subtitle2"
                  >
                    Info ᛫
                  </Link>
                  <Link
                    className="Footer-Link"
                    href="/"
                    color="inherit"
                    underline="none"
                    variant="subtitle2"
                  >
                    Support ᛫
                  </Link>
                  <Link
                    className="Footer-Link"
                    href="/"
                    color="inherit"
                    underline="none"
                    variant="subtitle2"
                  >
                    Marketing
                  </Link>
                </Typography>
              </Box>

              <Box>
                <Typography align="center">
                  <Link
                    className="Footer-Link"
                    href="/"
                    color="inherit"
                    underline="none"
                    variant="subtitle2"
                  >
                    Terms of Use ᛫
                  </Link>
                  <Link
                    className="Footer-Link"
                    href="/"
                    color="inherit"
                    underline="none"
                    variant="subtitle2"
                  >
                    Privacy Policy
                  </Link>
                </Typography>
              </Box>
              <Box>
                <Typography
                  className="Lowest-Footer-Box"
                  variant="subtitle2"
                  align="center"
                >
                  &copy; {new Date().getFullYear()} Cinetastisch Entertainment
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4} sm={4}></Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
