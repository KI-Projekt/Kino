import { Box, Button, Card, Grid, Link, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import OrderOverview from "../components/PaymentDetailsView/OrderOverview";
import QRCode from "react-qr-code";
import DownloadIcon from '@mui/icons-material/Download';
import { getMovieAfterReload, getShowAfterReload } from "./TicketView";
import { Movie, Order, Show, User } from "../interfaces/Interfaces";
import { getOrderAfterReload } from "./PaymentDetailsView";
import { redTheme } from "../interfaces/Theme";
import { useNavigate } from "react-router-dom";

interface OrderFinalisationViewProps {
    order: Order | undefined;
    setOrder: React.Dispatch<React.SetStateAction<Order | undefined>>;
    user?: User;
    setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
    selectedMovie: Movie | undefined;
    setSelectedShow: React.Dispatch<React.SetStateAction<Show | undefined>>;
    selectedShow: Show | undefined;
}

function OrderFinalisationView(props: OrderFinalisationViewProps) {

    const theme = useTheme();

    const printRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    const setSelectedShow = props.setSelectedShow;
    const setSelectedMovie = props.setSelectedMovie;
    const setOrder = props.setOrder;

    useEffect(() => {
        getShowAfterReload().then(result => setSelectedShow(result))
        getMovieAfterReload().then(result => setSelectedMovie(result));
        getOrderAfterReload().then(result => setOrder(result));
    }, [setSelectedShow, setSelectedMovie, setOrder])

    async function handleDownloadPDF() {
        const element = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            format: 'a4',
            unit: 'px',
            orientation: "landscape"
        });
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Cinetastisch_Order_${props.order?.id}.pdf`);
    }

    const navigate = useNavigate();

    return (
        <>
            {props.order && props.selectedMovie && props.selectedShow && (
                <div ref={printRef}>
                    <Box sx={{ flexGrow: 1, p: theme.spacing(3) }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={6} xl={6}>
                                <>
                                    <Box sx={{ py: theme.spacing(3), textAlign: "center", textJustify: "center", }}>
                                        <Typography
                                            variant="h3"
                                            sx={{
                                                py: theme.spacing(3),
                                                paddingLeft: theme.spacing(1)
                                            }}
                                        >
                                            Thank you for your Order!
                                        </Typography>
                                        <Typography variant="body1">
                                            Please make a screenshot or print this page.
                                        </Typography>
                                        <Typography variant="body1">
                                            We will send you an email with the tickets and the invoice soon.
                                        </Typography>
                                        {props.user?.id &&
                                            <Typography variant="body1">
                                                You can also find this order {" "}
                                                <Link onClick={() => navigate(`/profile/${props.user?.id}/myOrders`)}>
                                                    here
                                                </Link>
                                                .
                                            </Typography>
                                        }
                                    </Box>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Box sx={{ py: theme.spacing(3), textAlign: "center", textJustify: "center", }}>
                                        <Typography variant="body1" sx={{ pb: theme.spacing(2) }}>
                                            Below you can find the QR-Code for your order.
                                        </Typography>
                                        {props.order.id && <QRCode value={props.order?.id.toString()} size={150} />}
                                        <Typography sx={{ pt: theme.spacing(2) }}>Order-ID: {props.order?.id}</Typography>
                                    </Box>
                                    <Box sx={{ p: theme.spacing(2), textAlign: "center", textJustify: "center", }}>
                                        <Button
                                            onClick={handleDownloadPDF}
                                            startIcon={<DownloadIcon />}
                                        >
                                            Download Page
                                        </Button>
                                    </Box>
                                </>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} xl={6}>
                                <>
                                    <Card sx={{ backgroundColor: redTheme.palette.common.white }}>
                                        <OrderOverview
                                            orderID={props.order.id}
                                            movieID={props.selectedMovie.id}
                                            showID={props.selectedShow.showID}
                                            movie={props.selectedMovie.title}
                                            picture={props.selectedMovie.posterImage}
                                            showDate={props.selectedShow.dateTime}
                                            room={props.selectedShow.room?.name}
                                            seats={props.order.seats}
                                            fares={props.order.fares}
                                            price={props.order.total}
                                        />
                                    </Card>
                                </>
                            </Grid>
                        </Grid>
                    </Box>
                </div >
            )}
        </>
    );
}

export default OrderFinalisationView;