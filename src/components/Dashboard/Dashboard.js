import React from 'react';

import PhotoList from '../Album/Photolist';
import Albums from '../Album/Albums';
import { Paper } from '@material-ui/core';

export default function Dashboard() {
  return(
    <div>
      <Paper>
        <PhotoList />
        <Albums />
      </Paper>
    </div>
  );
}