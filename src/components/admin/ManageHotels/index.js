import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import HotelIcon from '@material-ui/icons/Hotel';
import PageHeader from '../common/PageHeader';

class ManageHotels extends React.Component {

  render() {

    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <PageHeader icon={<HotelIcon />} title="Manage Hotels" />
          <Typography paragraph>
            The 'Manage Hotels' Page comming soon...
          </Typography>
        </Container>
      </React.Fragment>
    );
  }
}

export default ManageHotels;