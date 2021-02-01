import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import HomeIcon from '@material-ui/icons/Home';
import PageHeader from '../common/PageHeader';

class Home extends React.Component {

  render() {

    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <PageHeader
            icon={<HomeIcon />}
            title="Home" />
          <Typography paragraph>
            The 'Home' Page comming soon...
          </Typography>
        </Container>
      </React.Fragment>
    );
  }
}

export default Home;