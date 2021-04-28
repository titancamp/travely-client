import React from "react";
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

export const TourDetails = ({ id }) => {
  console.log(id);
  const [open, setOpen] = React.useState(true);
  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>Tour details</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={4}>
            <div>
              <Typography variant="overline" color="textSecondary">
                Name
              </Typography>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                Name aklsjdkajs d
              </Typography>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <Typography variant="overline" color="textSecondary">
                Name
              </Typography>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                Name aklsjdkajs d
              </Typography>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <Typography variant="overline" color="textSecondary">
                Name
              </Typography>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                Name aklsjdkajs d
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="overline" color="textSecondary">
              Guest or other tabular data
            </Typography>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[1, 2, 3].map((row) => (
                    <TableRow key={row}>
                      <TableCell component="th" scope="row">
                        Name
                      </TableCell>
                      <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat</TableCell>
                      <TableCell align="right">Carbs</TableCell>
                      <TableCell align="right">Protein</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <DialogActions>
          <Button color="primary" onClick={() => setOpen(false)}>
            Agree
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
