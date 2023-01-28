import React from "react";
import OrderOverview from "../components/PaymentDetailsView/OrderOverview";
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
import { getMovieAfterReload, getShowAfterReload } from "./TicketView";
import { useNavigate } from "react-router-dom";
import { payOrder } from "../queries/changeOrders";
import { Movie, Order, Show, User } from "../interfaces/Interfaces";

interface PaymentDetailsViewProps {
  order: Order | undefined;
  setOrder: React.Dispatch<React.SetStateAction<Order | undefined>>;
  user: User;
  setUser: Function;
  personalDataFilled: boolean;
  setPersonalDataFilled: Function;
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
  selectedMovie: Movie | undefined;
  setSelectedShow: React.Dispatch<React.SetStateAction<Show | undefined>>;
  selectedShow: Show | undefined;
}

function PaymentDetailsView(props: PaymentDetailsViewProps) {

  const theme = useTheme();

  const [paymentMethod, setPaymentMethod] = React.useState<string | null>('cash');

  const [privacyPolicyChecked, setPrivacyPolicyChecked] = React.useState(false);

  const handleChangePrivacyPolicyCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacyPolicyChecked(event.target.checked);
  };

  const setSelectedShow = props.setSelectedShow;
  const setSelectedMovie = props.setSelectedMovie;
  const setOrder = props.setOrder;

  React.useEffect(() => {
    getShowAfterReload().then(result => setSelectedShow(result))
    getMovieAfterReload().then(result => setSelectedMovie(result));
    /* let url = window.location.href;

    let aUrlParts = url.split("/") */
    //let orderID = aUrlParts[6]
    //fetchOrderByID(parseInt(orderID)).then(result => setOrder(result))
  }, [setSelectedShow, setSelectedMovie, setOrder]);
  const navigate = useNavigate();

  function handleOnClick() {
    if (props.order?.id)
      payOrder(props.order?.id).then(result => {
        console.log(result);
      })
    navigate(`/order/${props.selectedMovie?.id}/${props.selectedShow?.showID}/${props.order?.id}`);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} xl={6}>
          {props.selectedMovie && props.selectedShow && props.order && (
            <OrderOverview
              orderID={props.order.id}
              movieID={props.selectedMovie?.id}
              showID={props.selectedShow?.showID}
              movie={props.selectedMovie?.title}
              picture={props.selectedMovie?.posterImage}
              showDate={props.selectedShow?.dateTime}
              room={props.selectedShow?.room}
              seats={props.order.seats}
              fares={props.order.fares}
              price={props.order.price}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6} xl={6}>
          <PersonalData
            personalDataFilled={props.personalDataFilled}
            setPersonalDataFilled={props.setPersonalDataFilled}
            user={props.user}
            setUser={props.setUser}
          />
          <PaymentOptions paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
          <FormControlLabel
            control={<Checkbox value={privacyPolicyChecked} onChange={handleChangePrivacyPolicyCheck} />}
            sx={{ paddingLeft: "3rem" }}
            label={
              <Typography>
                I accept the
                {" "}
                <Link
                  href={`/privacyPolicy`}
                  target="_blank"
                >
                  Privacy Policy
                </Link>
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
              disabled={(paymentMethod && privacyPolicyChecked && props.personalDataFilled) ? false : true}
              onClick={handleOnClick}
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
