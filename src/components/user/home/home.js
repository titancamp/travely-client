import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { GRID_ROWS, GRID_COLUMNS } from "./utils/constants";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import TourClient from "../../../api/tour-client";
import BookingClient from "../../../api/booking-client";

function formatDate(date) {
  const tempDate = new Date(date);
  return `${tempDate.getDate()}/${tempDate.getMonth()}/${tempDate.getFullYear()}`;
}

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      upcomingTours: [],
      activeTours: [],
      bookings: [],
    };
  }

  loadData() {
    TourClient.getUpcomingTours(new Date().toUTCString()).then(({ data }) => {
      this.setState({
        ...this.state,
        upcomingTours: data.slice(0, 3).map((d) => {
          d.startDate = formatDate(d.startDate);
          return d;
        }),
      });
    });
    TourClient.getActiveTours(new Date().toUTCString()).then(({ data }) => {
      this.setState({
        upcomingTours: data.slice(0, 3).map((d) => {
          d.startDate = formatDate(d.startDate);
          return d;
        }),
      });
    });
    BookingClient.getBookingsApproaching(new Date().toUTCString()).then(
      ({ data }) => {
        console.log(data);
        this.setState({
          bookings: data.map((d) => {
            d.cancellationDeadline = formatDate(d.cancellationDeadline);
            return d;
          }),
        });
      }
    );
  }

  componentDidMount() {
    this.loadData();
  }
  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Card>
            <CardHeader title="Upcoming Tours" />
            <CardContent>
              <List>
                {this.state.upcomingTours.map((t) => {
                  return (
                    <ListItem key={t.id}>
                      <ListItemAvatar>
                        <Avatar>
                          <BeachAccessIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={t.name} secondary={t.startDate} />
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader title="Active Tours" />
            <CardContent>
              <List>
                {this.state.activeTours.map((t) => {
                  return (
                    <ListItem key={t.id}>
                      <ListItemAvatar>
                        <Avatar>
                          <BeachAccessIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={t.name} secondary={t.startDate} />
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Bookings with approaching cancellation deadlines" />
            <CardContent>
              <DataGrid
                rows={this.state.bookings}
                columns={GRID_COLUMNS}
                autoHeight
                autoPageSize
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
