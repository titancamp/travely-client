import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ApartmentIcon from '@material-ui/icons/Apartment';
import PageHeader from '../common/PageHeader';

class AgencyProfile extends React.Component {

  render() {

    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <PageHeader icon={<ApartmentIcon />} title="Agency Profile" />
          <Typography paragraph>
            The 'Agency Profile' Page comming soon...
          </Typography>
        </Container>
      </React.Fragment>
    );
  }
}

export default AgencyProfile;