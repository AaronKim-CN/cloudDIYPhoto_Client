import React from 'react';
import axios from 'axios';
import config from '../../config.json';

import UploadForm from '../Upload/UploadForm';

import { withRouter } from 'react-router-dom';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';


const Styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: "100%",
        height: 600,
    },
});

class AlbumDetails extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          imageData: [],
          albumnames: []
        }
    }

    componentDidMount() {
        //let rurl = `${config.API_Endpoint}/getalbums/` + this.props.location.state.albumid
        let rurl = `${config.API_Endpoint}/pictures/` + this.props.location.state.albumid
        
        axios.get(rurl)
          .then(res => {

            this.setState({ imageData: res.data });
            
        })
    }
    
    render() {
        
        console.log(this.props.location.state.albumid)

        return (
            <div> 
                <Paper>
                    <Grid container justify="center" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <UploadForm albumid={this.props.location.state.albumid} />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <GridList className={this.props.classes.gridList} cols={4} spacing={5}>
                                {this.state.imageData.map((tile) => (
                                    <GridListTile key={tile.img} cols={tile.cols || 1}>
                                        <img src={tile.img} alt={tile.title} />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Grid>
                        
                    </Grid>
                </Paper>
                
            </div>
        )
    }

}

export default withRouter(withStyles(Styles, { withTheme: true })(AlbumDetails));