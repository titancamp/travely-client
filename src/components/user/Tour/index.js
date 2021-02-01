import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import WorkIcon from '@material-ui/icons/Work';
import PageHeader from '../common/PageHeader';

class Tour extends React.Component {

  render() {

    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <PageHeader icon={<WorkIcon />} title="Tour" />
          <Typography paragraph>
            The 'Tour' Page comming soon...
          </Typography>
        </Container>
      </React.Fragment>
    );
  }
}

export default Tour;