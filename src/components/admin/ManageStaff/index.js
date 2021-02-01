import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import GroupIcon from '@material-ui/icons/Group';
import PageHeader from '../common/PageHeader';

class ManageStaff extends React.Component {
  
  render() {

    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <PageHeader icon={<GroupIcon />} title="Manage Staff" />
          <Typography paragraph>
            The 'Manage Staff' Page comming soon...
          </Typography>
        </Container>
      </React.Fragment>
    );
  }
}

export default ManageStaff;