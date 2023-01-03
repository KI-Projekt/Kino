import { Box, Button, Card, Grid, Typography, useTheme } from "@mui/material";
import OrderOverview from "../components/PaymentDetailsView/OrderOverview";
import { User } from "../components/PaymentDetailsView/PersonalDataGuestUser";
import { Order } from "./PaymentDetailsView";
import { useEffect } from "react";
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface OrderFinalisationViewProps {
    order: Order | undefined;
    user: User;
}

function OrderFinalisationView(props: OrderFinalisationViewProps) {

    const theme = useTheme();

    useEffect(() => {
        console.log(props.order)
    }, []);

    const printRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    async function handleDownloadPDF() {
        const element = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
            (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('print.pdf');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography
                variant="h3"
                sx={{
                    p: theme.spacing(3),
                    paddingLeft: theme.spacing(1)
                }}
            >
                Thank you for your Order!
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                    <Button onClick={handleDownloadPDF}>Print PDF</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                    {props.order && (
                        <>
                            <div ref={printRef}>
                                <Card sx={{p: theme.spacing(3)}}>
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
                                </Card>
                            </div>
                        </>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

export default OrderFinalisationView;