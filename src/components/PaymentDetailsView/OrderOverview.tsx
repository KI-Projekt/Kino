import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { fareSelection } from "../TicketView/FareSelection";
import { Row } from "../../views/PaymentDetailsView";
import { Box, Divider, Grid } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

interface OrderOverviewProps {
  orderID: string | number | undefined;
  movieID: string | number | undefined;
  showID: string | number | undefined;
  movie: String | undefined;
  picture: string | undefined;
  showDate: Date | null | undefined;
  room: string | undefined;
  seats: Array<Row> | undefined;
  fares: Array<fareSelection> | undefined;
  price: number | undefined;
}

function OrderOverview(prop: OrderOverviewProps) {

  return (
    <Card
      variant="elevation"
      elevation={0}
      sx={{ display: "flex", m: "1rem", flexDirection: "row", flexGrow: 1 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8} md={8} xl={6}>
          <CardContent sx={{ flex: " 0 1 auto" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <Typography
                variant="h4"
                component="div"
                sx={{ paddingBottom: "1rem" }}
              >
                {prop.movie}
              </Typography>
              <Divider />
              <Box sx={{ paddingBottom: "1rem" }}>
                <Typography variant="h6">Date:</Typography>
                {prop.showDate && (
                  <Typography variant="body1" color="text.secondary">
                    {prop.showDate.toDateString()}, {prop.showDate.getHours()}:
                    {prop.showDate.getMinutes()}h
                  </Typography>
                )}
              </Box>
              <Divider />
              <Box sx={{ paddingBottom: "1rem" }}>
                <>
                  <Typography variant="h6">Seats:</Typography>
                  <Typography variant="body1" color="text.secondary">
                    {prop.room}
                  </Typography>
                  {prop.seats && prop.seats.map((seatRow, index) => {
                    return (
                      <div key={index}>
                        <Typography variant="body1" color="text.secondary">
                          Row: {seatRow.rowDescription}
                        </Typography>
                        <div className="row">
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ width: "7.5rem", paddingRight: "0rem" }}
                          >
                            Seat number:
                          </Typography>
                          {seatRow.seats.map((seatItem) => (
                            <Typography
                              variant="body1"
                              color="text.secondary"
                              sx={{
                                width: "0rem",
                                m: 0,
                                marginRight: "0.1rem",
                              }}
                            >
                              {seatItem.seatNumber}
                            </Typography>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </>
              </Box>
              <Divider />
              <Box sx={{ paddingBottom: "1rem" }}>
                <Typography variant="h6">Fares:</Typography>
                {prop.fares && prop.fares.map((fareItem) => (
                  <>
                    {fareItem.amountOfTickets !== 0 && (
                      <Typography variant="body1" color="text.secondary">
                        {fareItem.amountOfTickets} {fareItem.name}
                      </Typography>
                    )}
                  </>
                ))}
              </Box>
              <Divider />
              <Box sx={{ paddingBottom: "1rem" }}>
                <Typography variant="h6">Price:</Typography>
                <Typography variant="body1" color="text.secondary">
                  {prop.price} €
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={4} md={4} xl={6} sx={{ alignSelf: "center", justifySelf: "center" }}>
          <Box sx={{ alignSelf: "center", justifySelf: "center" }}>
            {prop.picture && <CardMedia component="img" alt="movie poster" image={prop.picture} width="50" />}
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default OrderOverview;
