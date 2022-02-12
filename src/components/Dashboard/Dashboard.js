import React from 'react';
import Albums from '../Album/Albums';
import { withRouter } from 'react-router-dom';

//MUI5.0
import { Paper } from '@mui/material';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    
    return (
      <div>
        <Paper>
          <Albums token={this.props.token} />
        </Paper>
      </div>
    )
  }

}

export default withRouter(Dashboard);