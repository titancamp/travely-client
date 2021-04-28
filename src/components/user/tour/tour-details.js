import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TourClient from "../../../api/tour-client";

function formatDate(date) {
  const tempDate = new Date(date);
  return `${tempDate.getDate()}/${tempDate.getMonth()}/${tempDate.getFullYear()}`;
}

export const TourDetails = ({ id, onClose }) => {
  const [tourData, setTourData] = useState(null);

  useEffect(() => {
    TourClient.getTourById(id).then(({ data }) => {
      data.startDate = formatDate(data.startDate);
      data.endDate = formatDate(data.endDate);
      data.hotels = [];
      data.activities = [];
      data.bookings.forEach((b) => {
        if (b.type === 1) {
          b.deadline = formatDate(b.bookingProperty.cancellationDeadline);
          b.checkInDate = formatDate(b.bookingProperty.checkInDate);
          b.checkOutDate = formatDate(b.bookingProperty.checkOutDate);
          data.hotels.push(b);
        } else if (b.type === 2) {
          b.bookingDate = formatDate(b.bookingService.bookingDate);
          data.activities.push(b);
        }
      });
      setTourData(data);
    });
  }, []);

  return (
    <Dialog open maxWidth="md" fullWidth>
      <DialogTitle>Tour details</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={3}>
            <div>
              <Typography variant="overline" color="textSecondary">
                Name
              </Typography>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                {tourData && tourData.name}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div>
              <Typography variant="overline" color="textSecondary">
                Start date
              </Typography>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                {tourData && tourData.startDate}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div>
              <Typography variant="overline" color="textSecondary">
                End date
              </Typography>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                {tourData && tourData.endDate}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div>
              <Typography variant="overline" color="textSecondary">
                Origin
              </Typography>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                {tourData && tourData.origin}
              </Typography>
            </div>
          </Grid>

          <Box mt={2} width="100%">
            <Grid item xs={12}>
              <Typography variant="overline" color="textSecondary">
                Hotels
              </Typography>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Deadline</TableCell>
                      <TableCell align="right">Check-in date</TableCell>
                      <TableCell align="right">Check-out date</TableCell>
                      <TableCell align="right">Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tourData &&
                      tourData.hotels.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.bookingProperty.propertyName}
                          </TableCell>
                          <TableCell align="right">{row.deadline}</TableCell>
                          <TableCell align="right">{row.checkInDate}</TableCell>
                          <TableCell align="right">
                            {row.checkOutDate}
                          </TableCell>
                          <TableCell align="right">
                            {row.bookingProperty.notes}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Box>
          <Box mt={2} width="100%">
            <Grid item xs={12}>
              <Typography variant="overline" color="textSecondary">
                Activities
              </Typography>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Booking date</TableCell>
                      <TableCell align="right">Booking time</TableCell>
                      <TableCell align="right">Number of guests</TableCell>
                      <TableCell align="right">Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tourData &&
                      tourData.activities.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.bookingService.serviceName}
                          </TableCell>
                          <TableCell align="right">{row.bookingDate}</TableCell>
                          <TableCell align="right">
                            {row.bookingService.bookingTime}
                          </TableCell>
                          <TableCell align="right">
                            {row.bookingService.numberOfGuests}
                          </TableCell>
                          <TableCell align="right">
                            {row.bookingService.notes}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Box>
        </Grid>

        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Agree
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
