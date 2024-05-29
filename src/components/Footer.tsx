import * as React from "react";
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
import { User } from "../interfaces/Interfaces";

interface FooterProps {
  user?: User;
}

export default function Footer(props: FooterProps) {
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    navigate(`/${link}`);
  };

  const theme = useTheme();

  return (
    <Box className="text-white bg-slate-800 py-2 static bottom-0 w-full mb-0">
      <Container  sx={{ width: "100%" }}>
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
                  <IconButton onClick={() => handleClick("about")}>
                    <InfoIcon
                      sx={{ color: theme.palette.common.white }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Getting Here">
                  <IconButton onClick={() => handleClick("gettingHere")}>
                    <AssistantDirectionIcon
                      sx={{ color: theme.palette.common.white }}
                      
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Account Information">
                  <IconButton onClick={() => handleClick(props.user?.firstName ? `profile/${props.user?.id}` : "login")}>
                    <AccountCircleIcon
                      sx={{ color: theme.palette.common.white }}
                      
                    />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Typography align="center">
                <Link
                  className="p-1"
                  href="/openingHours"
                  color="inherit"
                  underline="none"
                  variant="subtitle2"
                >
                  Opening Hours ᛫
                </Link>
                <Link
                  className="p-1"
                  href="/ticketPrices"
                  color="inherit"
                  underline="none"
                  variant="subtitle2"
                >
                  Price Categories ᛫
                </Link>
                <Link
                  className="p-1"
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
                  className="p-1"
                  href="/impressum"
                  color="inherit"
                  underline="none"
                  variant="subtitle2"
                >
                  Impressum ᛫
                </Link>
                <Link
                  className="p-1"
                  href="/privacyPolicy"
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
                className="pt-1 text-gray-400"
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
