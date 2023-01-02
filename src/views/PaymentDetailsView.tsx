import React from "react";
import OrderOverview from "../components/PaymentDetailsView/OrderOverview";
import { fareSelection } from "../components/TicketView/FareSelection";
import "bootstrap/dist/css/bootstrap.min.css";
import PersonalData from "../components/PaymentDetailsView/PersonalData";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import PaymentOptions from "../components/PaymentDetailsView/PaymentOptions";
import "bootstrap/dist/css/bootstrap.min.css";

export interface Seat {
  seatID: string | null;
  seatNumber: number | null;
  booked: boolean | null;
  selected: boolean | null;
  seatRowID: number;
}

export interface Row {
  seatRowID: number;
  rowDescription: String;
  seats: Array<Seat>;
}

export interface Order {
  orderID: string;
  movieID: string;
  showID: string | undefined;
  movie: String | undefined;
  picture: string | undefined;
  showDate: Date | null | undefined;
  room: string | undefined;
  seats: Array<Row>;
  fares: Array<fareSelection>;
  price: number;
}

interface PaymentDetailsViewProps {
  order: Order | undefined;
}

function PaymentDetailsView(props: PaymentDetailsViewProps) {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} xl={6}>
          {props.order && (
            <OrderOverview
              orderID={props.order.orderID}
              movieID={props.order.movieID}
              showID={props.order.orderID}
              movie={props.order.movie}
              picture={props.order.picture}
              showDate={props.order.showDate}
              room={props.order.room}
              seats={props.order.seats}
              fares={props.order.fares}
              price={props.order.price}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6} xl={6}>
          <PersonalData />
          <PaymentOptions />
          <FormControlLabel
            control={<Checkbox />}
            sx={{ paddingLeft: "3rem" }}
            label={
              <Typography>
                I accept the <Link href={`/`}>Terms of Use</Link> &{" "}
                <Link href={`/`}>Privacy Policy</Link>
              </Typography>
            }
          />
          <br />
          <Box
            sx={{
              m: 3,
              paddingLeft: theme.spacing,
              paddingRight: theme.spacing,
            }}
          >
            <Button
              variant="contained"
              sx={{ paddingX: theme.spacing, width: "100%" }}
            >
              Buy with payment
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PaymentDetailsView;
