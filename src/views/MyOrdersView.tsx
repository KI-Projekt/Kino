import { Alert, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import DeleteDialog from '../components/MyOrdersView/deleteDialog';
import OrderTile from '../components/MyOrdersView/OrderTile';
import OrderOverview from '../components/PaymentDetailsView/OrderOverview';
import { Order, Row, SimpleFare, Ticket, User } from '../interfaces/Interfaces';
import { redTheme } from '../interfaces/Theme';
import { refundOrder } from '../queries/changeOrders';
import { fetchOrderByUserID } from '../queries/fetchOrder';
import AddReview from '../components/MyOrdersView/addReviewDialog';

interface MyOrdersProps {
    user?: User;
}

function MyOrdersView(props: MyOrdersProps) {

    const [orders, setOrders] = React.useState<Array<Order> | undefined>(undefined)
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [reviewDialogOpen, setReviewDialogOpen] = React.useState(false);
    const [order, setOrder] = React.useState<Order | undefined>(undefined)

    const navigate = useNavigate();

    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    function onOrderTileClick(order: Order) {
        let selectedSeats: Array<Row> = []
        order.tickets && order.tickets.forEach((ticket: Ticket) => {
            let rowExists = false;
            let newRow: Row = { rowDescription: `${ticket.seat.row}`, seats: [ticket.seat] };
            if (selectedSeats.length > 0) {
                selectedSeats.forEach(row => {
                    if (`${ticket.seat.row}` === row.rowDescription) {
                        rowExists = true;
                        row.seats.push(ticket.seat);
                    }
                })
                if (!rowExists)
                    selectedSeats.push(newRow);
            } else {
                selectedSeats.push(newRow)
            }
        })
        order.seats = selectedSeats;
        if (order.faresSelected) {
            let fares: Array<SimpleFare> = [];
            let keys = Object.keys(order.faresSelected);
            keys.forEach(key => {
                fares.push({
                    name: key,
                    ammount: order.faresSelected[key]
                });
            });
            order.fares = fares;
        }
        setOrder(order);
        setDialogOpen(true);
    }

    const onRefundClick = () => {
        refundOrder(order?.id).then(() => {
            fetchOrderByUserID(props.user?.id).then(result => {
                setOrders(result)
                setDialogOpen(false);
                setDeleteDialogOpen(false);
            });
        });
    }
    const onSaveReviewClick = ()=>{
        //hier speichern bei review
    }

    React.useEffect(() => {
        if (props.user?.id) {
            fetchOrderByUserID(props.user?.id).then(result => {
                let sortedOrders: any = []
                result.forEach((order: any) => {
                    if (order.orderStatus === "PAID") {
                        sortedOrders.push(order)
                    }
                })
                setOrders(sortedOrders);
            })
        } else {
            navigate("/");
        }
    }, [props.user?.id, navigate]);

    return (
        <>
            <Typography sx={{ p: 4 }} align="center" variant='h4'>My Orders</Typography>
            {orders?.map((order => {
                return (
                    <OrderTile order={order} onOrderTileClick={onOrderTileClick} />
                );
            }))}
            <Dialog
                fullScreen={fullScreen}
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                aria-labelledby="responsive-dialog-title"
                maxWidth="lg"
            >
                <DialogTitle id="responsive-dialog-title">
                    <Typography align='center'>Order Details</Typography>
                </DialogTitle>
                <DialogContent >
                    <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ width: { xl: "50rem" } }}>
                        <Grid item xs={12} sm={12} md={6} xl={6}>
                        {order?.paymentMethod=== "CASH" &&<Alert severity='warning'>Please note: You still need to pay this Reservation at the counter</Alert>}
                            <Box sx={{ py: theme.spacing(3), textAlign: "center", textJustify: "center", }}>
                                {order?.id && <QRCode value={order?.id.toString()} size={150} />}
                                <Typography sx={{ pt: theme.spacing(2) }}>Order-ID: {order?.id}</Typography>
                                <Typography sx={{ pt: theme.spacing(2) }}>Payment Method: {order?.paymentMethod}</Typography>
                                <Button sx={{p:5}} onClick={() => setDeleteDialogOpen(true)}>Refund</Button>
                                <Button sx={{p:5}} onClick={()=> setReviewDialogOpen(true)}>Add Review</Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} xl={6}>
                            <>
                                <Card sx={{ backgroundColor: redTheme.palette.common.white }}>
                                    {order && order.tickets && order.tickets[0].screening.startDateTime &&
                                        <OrderOverview
                                            orderID={order?.id}
                                            movieID={order.tickets[0].screening.movie?.id}
                                            showID={order.tickets[0].screening.showID}
                                            movie={order.tickets[0].screening.movie?.title}
                                            picture={order.tickets[0].screening.movie?.posterImage}
                                            showDate={new Date(order.tickets[0].screening.startDateTime)}
                                            room={order.tickets[0].screening.room?.name}
                                            seats={order.seats}
                                            fares={order.fares}
                                            price={order.total}
                                        />}
                                </Card>
                            </>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} autoFocus variant='contained'>
                        Okay
                    </Button>

                </DialogActions>
            </Dialog>
            <DeleteDialog onRefundClick={onRefundClick} dialogOpen={deleteDialogOpen} setDialogOpen={setDeleteDialogOpen} />
            <AddReview onSaveReviewClick={onSaveReviewClick} dialogOpen={reviewDialogOpen} setDialogOpen={setReviewDialogOpen}></AddReview>
        </>
    );
}

export default MyOrdersView;