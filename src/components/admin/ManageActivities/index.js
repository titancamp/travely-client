import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PublicIcon from '@material-ui/icons/Public';
import PageHeader from '../common/PageHeader';

class ManageActivities extends React.Component {

  render() {

    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <PageHeader icon={<PublicIcon />} title="Manage Activities" />
          <Typography paragraph>
            The 'Manage Activities' Page comming soon...
          </Typography>
        </Container>
      </React.Fragment>
    );
  }
}

export default ManageActivities;