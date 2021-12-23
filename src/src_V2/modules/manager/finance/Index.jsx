import React from 'react';
import { Container } from '../../../components';

import { Typography } from '@mui/material';
import { managerSidebarConfig } from '../config';

export default function Finance() {
  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <Typography>Finance</Typography>
    </Container>
  );
}
