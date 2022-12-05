import { TableCell, tableCellClasses, TableRow, Container, Typography, TableContainer, Paper, Table, TableHead, TableBody, styled, FormControlLabel, Switch, TextField } from '@mui/material';
import * as React from 'react';
import { redTheme } from '../App';

interface State {
    isAdmin: boolean;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    weekday: string,
    openingHoursStart: string,
    openingHoursEnd: string,
) {
    return { weekday, openingHoursStart, openingHoursEnd };
}
const rows = [
    createData('Monday', '17:00', '24:00'),
    createData('Tuesday', '17:00', '24:00'),
    createData('Wednesday', '17:00', '24:00'),
    createData('Thursday', '17:00', '24:00'),
    createData('Friday', '17:00', '24:00'),
    createData('Saturday', '17:00', '24:00'),
    createData('Sunday', '17:00', '24:00'),
];

function OpeningHours() {
    const [values, setValues] = React.useState<State>({
        isAdmin: false,
    });

    const handleChangeAdminMode = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setValues({
            ...values,
            isAdmin: event.target.checked,
        });
        console.log(values.isAdmin)
    };

    return (
        <Container maxWidth='xs' >
            <Typography variant='h4' align='left' sx={{ paddingBottom: '3rem', paddingTop: '3rem', color: redTheme.palette.primary.contrastText }}>Opening hours</Typography>
            <TableContainer component={Paper} >
                <Table aria-label="customized table">
                    <TableHead >
                        <TableRow >
                            <StyledTableCell >Weekday</StyledTableCell>
                            {!values.isAdmin && (
                                <StyledTableCell align="right">Opening hours</StyledTableCell>
                            )}
                            {values.isAdmin && (
                                    <StyledTableCell align="left">Start</StyledTableCell>
                            )}
                            {values.isAdmin && (
                                    <StyledTableCell align="left">End</StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.weekday}>
                                <StyledTableCell component="th" scope="row">
                                    {row.weekday}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {!values.isAdmin && (
                                        <Typography>{row.openingHoursStart} - {row.openingHoursEnd}</Typography>
                                    )}
                                    {values.isAdmin && (
                                        <TextField variant='outlined' defaultValue={row.openingHoursStart} /* label={`Condition for ${row.name}`} */ />
                                    )}

                                </StyledTableCell>
                                {values.isAdmin && (
                                    <StyledTableCell align="right">
                                        <TextField variant='outlined' defaultValue={row.openingHoursEnd} /* label={`Condition for ${row.name}`} */ />
                                    </StyledTableCell>
                                )}

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <FormControlLabel control={<Switch onChange={handleChangeAdminMode} />} label="Admin" /> */}
        </Container>
    )
}

class OpeningHoursView extends React.Component {
    render() {
        return (
            <OpeningHours />
        );
    }
}

export default OpeningHoursView;