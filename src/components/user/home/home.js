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

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      homeData: [],
    };
  }

  loadData() {
    this.setState({ homeData: GRID_ROWS });
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
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <BeachAccessIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="John Smith Family Armenia Food Tour"
                    secondary="Jan 9, 2014"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <BeachAccessIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Bellinis in Armenia"
                    secondary="Jan 7, 2014"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <BeachAccessIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Bellinis in Armenia"
                    secondary="July 20, 2014"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader title="Active Tours" />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <BeachAccessIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="John Smith Family Armenia Food Tour"
                    secondary="Jan 9, 2014"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <BeachAccessIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Bellinis in Armenia"
                    secondary="Jan 7, 2014"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <BeachAccessIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Bellinis in Armenia"
                    secondary="July 20, 2014"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Bookings with approaching cancellation deadlines" />
            <CardContent>
              <DataGrid
                rows={this.state.homeData}
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
