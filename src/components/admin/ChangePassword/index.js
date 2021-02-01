import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LockIcon from '@material-ui/icons/Lock';
import PageHeader from '../common/PageHeader';

class ChangePassword extends React.Component {

  render() {

    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <PageHeader icon={<LockIcon />} title="Change Password" />
          <Typography paragraph>
            The 'Change Password' Page comming soon...
          </Typography>
        </Container>
      </React.Fragment>
    );
  }
}

export default ChangePassword;