import React from 'react';
import axios from 'axios';
import config from '../../config.json';
import UploadForm from '../Upload/UploadForm';
import { withRouter } from 'react-router-dom';

//MUI5.0
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid, Paper, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import withMediaQuery from '../Lib/withMediaQuery';

class AlbumDetails extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          imageData: [],
          albumnames: [],
          open: false
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

    handleClick = () => {
        console.log("clicked")
        this.setState({ open: true })
    }

    handleClose = () => {
        console.log("close")
        this.setState({ open: false })
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
                            <ImageList sx={{ width: "100%", height: 600 }} cols={3} gap={5}>
                                {this.state.imageData.map((tile) => (
                                    <ImageListItem key={tile.img} cols={tile.cols || 1} onClick={this.handleClick}>
                                        <img src={tile.img} alt={tile.title} />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                            <Dialog fullScreen ={this.props.isMobile}
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    aria-labelledby="responsive-dialog-title">
                            <DialogTitle id="responsive-dialog-title">
                                    {"Full Image"}
                            </DialogTitle>
                            <DialogContent>
                                <img src="https://www.tv-asahi.co.jp/shinchan/character/img/01.png"></img>
                            </DialogContent>
                            <DialogActions>
                            <Button autoFocus onClick={this.handleClose}>
                                Close
                            </Button>
                            </DialogActions>
                            </Dialog>
                        </Grid>
                        
                    {/* </Grid> */}
                </Paper>
                
            </div>
        )
    }

}

export default withRouter(withMediaQuery([['isMobile', theme => theme.breakpoints.down('md'), {
    defaultMatches: true
  }]])(AlbumDetails));