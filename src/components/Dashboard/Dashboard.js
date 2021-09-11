import React from 'react';

import PhotoList from '../Album/Photolist';
import Albums from '../Album/Albums';
import { Paper } from '@material-ui/core';

import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const Styles = theme => ({
  cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
  }
});

class Dashboard extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    
    return (
      <div>
        <Paper>
          {/* <PhotoList /> */}
          <Albums token={this.props.token} />
        </Paper>
      </div>
    )
  }

}

export default withRouter(withStyles(Styles, { withTheme: true })(Dashboard));