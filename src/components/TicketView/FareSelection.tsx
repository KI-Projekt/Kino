import { Box, IconButton, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from "@mui/material";
import React, { useEffect } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { isMobile } from 'react-device-detect';

interface fareSelectionProps {
    totalAmountOfTickets: number;
    fares: fareSelection[];
    setFares: React.Dispatch<React.SetStateAction<fareSelection[]>>;
    windowWidth: number;
}
export interface fareSelection {
    id: number;
    name: string;
    price: number;
    condition: string;
    amountOfTickets: number;
}

function FareSelection(props: fareSelectionProps) {

    const totalAmountOfTickets = props.totalAmountOfTickets;

    const [anchorElConditionInfo, setAnchorElConditionInfo] = React.useState<HTMLButtonElement | null>(null);

    const [currentFareCondition, setCurrentFareCondition] = React.useState<string>("");

    const handleClickOnInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElConditionInfo(event.currentTarget);
        setCurrentFareCondition(event.currentTarget.id);
    };

    const handleCloseOnInfo = () => {
        setAnchorElConditionInfo(null);
        setCurrentFareCondition("");
    };

    const openConditionInfo = Boolean(anchorElConditionInfo);

    const popOver = (
        <Popover
            id={currentFareCondition}
            open={openConditionInfo}
            anchorEl={anchorElConditionInfo}
            onClose={handleCloseOnInfo}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Typography sx={{ p: 2 }}>{currentFareCondition}</Typography>
        </Popover>
    )

    const fares = props.fares;
    const setFares = props.setFares;

    useEffect(() => {
        //initial calculation of ticket amount and add everything to adult fare
        const calculateTotalAmountOfTickets = () => {
            let totalAmountOfTickets = 0;
            fares.forEach((row) => {
                totalAmountOfTickets += row.amountOfTickets;
            });
            return totalAmountOfTickets;
        };
        const currentTotalAmountOfTickets = calculateTotalAmountOfTickets();
        if (currentTotalAmountOfTickets !== totalAmountOfTickets) {
            const newFares = fares.map((row, id) => {
                if (id === 0) {
                    return {
                        ...row,
                        amountOfTickets: props.totalAmountOfTickets,
                    }
                } else {
                    return {
                        ...row,
                        amountOfTickets: 0
                    }
                }
            })
            setFares(newFares);
        }
    }, [totalAmountOfTickets, fares, props.totalAmountOfTickets, setFares]);

    const handleRemoveTicket = (index: number) => {
        let isNumberChanged = false;
        if (fares[index].amountOfTickets > 0) {
            const newFares = fares.map((row, id) => {
                if (index === id) {
                    return { ...row, amountOfTickets: --row.amountOfTickets, }
                } else {
                    for (let i = 0; i < fares.length; i++) {
                        if ((id === i) && (!isNumberChanged)) {
                            isNumberChanged = true;
                            return { ...row, amountOfTickets: ++row.amountOfTickets, };
                        }
                    }
                }
                return row;
            });
            setFares(newFares);
        }
    };

    const handleAddTicket = (index: number) => {
        let isNumberChanged = false;
        if (fares[index].amountOfTickets < totalAmountOfTickets) {
            const newFares = fares.map((row, id) => {
                if (index === id) {
                    return { ...row, amountOfTickets: ++row.amountOfTickets, };
                } else {
                    //remove tickets of first fare
                    for (let i = 0; i < fares.length; i++) {
                        if ((id === i) && (row.amountOfTickets > 0) && (!isNumberChanged)) {
                            isNumberChanged = true;
                            return { ...row, amountOfTickets: --row.amountOfTickets, };
                        }
                    }
                }
                return row;
            });
            setFares(newFares);
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.paper' }} alignItems='center'>
            <Typography align="center" variant="h4" sx={{ p: 3 }}>{totalAmountOfTickets} Tickets</Typography>
            <TableContainer component={Paper} elevation={0}>
                <Table padding="normal">
                    <TableBody>
                        {fares.map((fare, index) => (
                            <TableRow key={index}  >
                                <TableCell
                                    align='center'
                                    sx={{ 
                                        alignContent: 'center', 
                                        px: { xs: "0rem", sm: "1rem" }, 
                                        mx: { xs: "0rem", sm: "1rem" },
                                     }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography>{fare.name}</Typography>
                                        {fare.condition !== "" && isMobile &&
                                            <IconButton
                                                aria-describedby={fare.condition}
                                                id={fare.condition}
                                                onClick={handleClickOnInfo}
                                                sx={{
                                                    width: {
                                                        xs: `${(props.windowWidth / 260)}rem`,
                                                        sm: `${(props.windowWidth / 260)}rem`,
                                                        md: `${(props.windowWidth / 520)}rem`,
                                                        xl: `${(props.windowWidth / 520)}rem`,
                                                    }
                                                }}
                                            >
                                                <HelpOutlineIcon color={"info"} />
                                            </IconButton>
                                        }
                                        {fare.condition !== "" && !isMobile &&
                                            <Tooltip title={fare.condition}>
                                                <HelpOutlineIcon sx={{ ml: { xs: "0.05rem", sm: "1rem" } }} color={"info"} />
                                            </Tooltip>
                                        }
                                    </Box>
                                </TableCell>
                                < TableCell align='center' >
                                    <IconButton onClick={() => handleRemoveTicket(index)} disabled={fare.amountOfTickets === 0}>
                                        <RemoveCircleOutlineIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align='center'>
                                    <Typography>{fare.amountOfTickets}</Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    <IconButton onClick={() => handleAddTicket(index)} disabled={fare.amountOfTickets === totalAmountOfTickets}>
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
            {popOver}
        </Box >
    );
}

export default FareSelection; 