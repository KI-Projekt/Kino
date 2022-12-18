import React from "react";
import OrderOverview from "../components/PaymentDetailsView/OrderOverview";
import { fareSelection } from "../components/TicketView/FareSelection";
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonalData from "../components/PaymentDetailsView/PersonalData";
import { Button, Card, Checkbox, FormControlLabel, Link, Typography } from "@mui/material";
import PaymentOptions from "../components/PaymentDetailsView/PaymentOptions";

export interface Seat {
    seatID: number,
    seatNumber: number,
}

export interface Row {
    seatRowID: number,
    rowDescription: String,
    seats: Array<Seat>,
}

function PaymentDetailsView() {
    function createData(
        orderID: number,
        movieID: number,
        showID: number,
        movie: string,
        picture: string,
        showDate: Date,
        room: string,
        seats: Array<Row>,
        fares: Array<fareSelection>,
        price: number,
    ) {
        return {
            orderID, movieID, showID, movie, picture, showDate, room, seats, fares,
            price
        };
    };

    const orderData =
        createData(
            52374,
            346572,
            32765425,
            "Captain Marvel",
            "https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_SX300.jpg",
            new Date(2023, 4, 4, 20, 30),
            "Saal A",
            [{ seatRowID: 0, rowDescription: "D", seats: [{ seatID: 1, seatNumber: 2 }, { seatID: 2, seatNumber: 3 }] },
            { seatRowID: 1, rowDescription: "A", seats: [{ seatID: 6, seatNumber: 6 }, { seatID: 8, seatNumber: 8 }, { seatID: 7, seatNumber: 7 }, { seatID: 9, seatNumber: 9 }] }],
            [{ id: 12435, name: "Adult", price: 10.00, condition: "People older than 16 and younger than 65 years old", amountOfTickets: 2, },
            { id: 1, name: 'Kid', price: 7.00, condition: "Kids under 16 years old", amountOfTickets: 1 },
            { id: 2, name: 'Student', price: 8.00, condition: "Students with a student ID", amountOfTickets: 1 },
            { id: 3, name: 'Pensioner', price: 9.00, condition: "People older than 65", amountOfTickets: 2 }],
            32.5,
        )
        ;

    return (
        <div className="row">
            <OrderOverview
                orderID={orderData.orderID}
                movieID={orderData.movieID}
                showID={orderData.orderID}
                movie={orderData.movie}
                picture={orderData.picture}
                showDate={orderData.showDate}
                room={orderData.room}
                seats={orderData.seats}
                fares={orderData.fares}
                price={orderData.price}
            />
            <Card sx={{ maxWidth: '45rem', m: '1rem' }}>
                <PersonalData />
                <PaymentOptions />
                <FormControlLabel
                    control={<Checkbox />}
                    sx={{ paddingLeft: '3rem' }}
                    label={
                        <Typography >
                            I accept the <Link href={`/`}>Terms of Use</Link> & <Link href={`/`}>Privacy Policy</Link>
                        </Typography>
                    }
                />
                <br />
                <Button variant="contained" sx={{m:'1rem', minWidth: '40rem'}}>Buy with payment</Button>
            </Card>
        </div>
    );
};

export default PaymentDetailsView;