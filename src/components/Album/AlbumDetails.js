import React from 'react';
import axios from 'axios';
import config from '../../config.json';
import UploadForm from '../Upload/UploadForm';
import { withRouter } from 'react-router-dom';

//MUI5.0
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid, Paper } from '@mui/material';

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
        let rurl = `${config.API_Endpoint}/pictures/` + this.props.location.state.albumid + "/thumnail"
        
        axios.get(rurl,{
            headers: {
                'Authorization': `token ${this.props.token}`
            } 
        }).then(res => {
            this.setState({ imageData: res.data });
        })
    }
    
    render() {
        
        return (
            <div> 
                <Paper sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden'}}>
                    {/* <Grid container justify="center" alignItems="stretch" spacing={3}> */}
                        <Grid item xs={12} sm={4}>
                            <UploadForm albumid={this.props.location.state.albumid} token={this.props.token} />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <ImageList sx={{ width: "100%", height: 600 }} cols={5} spacing={5}>
                                {this.state.imageData.map((tile) => (
                                    <ImageListItem key={tile.img} cols={tile.cols || 1}>
                                        <img src={tile.img} alt={tile.title} />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Grid>
                        
                    {/* </Grid> */}
                </Paper>
                
            </div>
        )
    }

}

export default withRouter(AlbumDetails);