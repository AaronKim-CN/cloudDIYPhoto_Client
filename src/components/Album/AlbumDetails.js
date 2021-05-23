import React from 'react';
import axios from 'axios';

import Upload from '../Upload/Upload';

import { withRouter } from 'react-router-dom';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from '@material-ui/core/styles';


const Styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
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
        let rurl = "http://localhost:9000/getalbums/" + this.props.location.state.albumid

        axios.get(rurl)
          .then(res => {

            this.setState({ imageData: res.data });
            
        })
    }
    
    render() {
        
        console.log(this.props.location.state.albumid)

        return (
            <div> 
                Hello World, This is Album Detail Page 
                <Upload />
                <GridList cellHeight={260} className={this.props.classes.gridList} cols={3}>
                    {this.state.imageData.map((tile) => (
                        <GridListTile key={tile.img} cols={tile.cols || 1}>
                            <img src={tile.img} alt={tile.title} />
                        </GridListTile>
                    ))}
                </GridList>

                
            </div>
        )
    }

}

export default withRouter(withStyles(Styles, { withTheme: true })(AlbumDetails));