import React from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const Styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 800,
    // height: 450,
    flexWrap: 'nowrap',
    // transform: 'translateZ(0)'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});


class PhotoList extends React.Component {
  state = {
    imagetags: []
  }

  componentDidMount() {
    axios.get(`http://localhost:9000/mys3/`)
      .then(res => {
        let tmp = []
        for (let x in res.data){
          const imagetag = "data:image/jpeg;base64," + res.data[x]
          tmp.push(imagetag)
        }
        this.setState({ imagetags: tmp });
        
      })
  }

  render() {

    return (
      <div className={this.props.classes.root}>
        <GridList className={this.props.classes.gridList} cols={4}>
          {this.state.imagetags.map((item,index)=>{
            let k = "test" + index
            return <GridListTile key={k}>
                      <img src={item} />
                  </GridListTile>
          })}
          
        </GridList>

      </div>
    )
  }
}

export default withStyles(Styles, { withTheme: true })(PhotoList);