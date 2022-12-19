import * as React from "react";
import "../styles/Footer.css";
import {
  Container,
  Grid,
  Box,
  Typography,
  IconButton,
  Link,
  useTheme,
  Tooltip,
} from "@mui/material/";
import InfoIcon from "@mui/icons-material/Info";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const handleClick = (link: string) => {
    navigate(`/${link}`);
  };

  const theme = useTheme();

  return (
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
                <Tooltip title="About Us">
                  <IconButton onClick={() => handleClick("")}>
                    <InfoIcon
                      sx={{ color: theme.palette.common.white }}
                      className="Footer-Icons"
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Getting Here">
                  <IconButton onClick={() => handleClick("")}>
                    <AssistantDirectionIcon
                      sx={{ color: theme.palette.common.white }}
                      className="Footer-Icons"
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Account Information">
                  <IconButton onClick={() => handleClick("")}>
                    <AccountCircleIcon
                      sx={{ color: theme.palette.common.white }}
                      className="Footer-Icons"
                    />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Typography align="center">
                <Link
                  className="Footer-Link"
                  href="/openingHours"
                  color="inherit"
                  underline="none"
                  variant="subtitle2"
                >
                  Opening Hours ᛫
                </Link>
                <Link
                  className="Footer-Link"
                  href="/ticketPrices"
                  color="inherit"
                  underline="none"
                  variant="subtitle2"
                >
                  Price Categories ᛫
                </Link>
                <Link
                  className="Footer-Link"
                  href="/contact"
                  color="inherit"
                  underline="none"
                  variant="subtitle2"
                >
                  Contact Us
                </Link>
              </Typography>
            </Box>

            <Box>
              <Typography align="center">
                <Link
                  className="Footer-Link"
                  href="/impressum"
                  color="inherit"
                  underline="none"
                  variant="subtitle2"
                >
                  Impressum ᛫
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
  );
}
