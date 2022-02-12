import React from 'react';
import axios from 'axios';
import config from '../../config.json';
import UploadForm from '../Upload/UploadForm';
import { withRouter } from 'react-router-dom';

//MUI5.0
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Grid, Paper, Button, ButtonGroup } from '@mui/material';
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
          lastKey: '',
          count: 0,
          open: false,
          popupUrl: "",
          page: 1,
          xsState: 'none'
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
            console.log("ssssss");
            console.log(res.data);
            this.setState({ imageData: res.data.imageData });
            this.setState({ lastKey: res.data.lastKey });
            this.setState({ count: res.data.count });
        })
    }

    handleClick = (key) => {
        console.log("clicked")
        console.log(key)
        let url =  `${config.API_Endpoint}/pictures/` + this.props.location.state.albumid + "/" + key

        axios.get(url,{
            headers: {
                'Authorization': `token ${this.props.token}`
            } 
        }).then(res => {
            console.log("yyyyy");
            console.log(res.data.img);
            this.setState({ popupUrl: res.data.img })
            this.setState({ open: true })
        })
    }

    handlePage = (event, value) => {

        this.setState({ page: value})
    }

    handleClose = () => {
        console.log("close")
        this.setState({ open: false })
    }

    nextPage = () => {

        let rurl = `${config.API_Endpoint}/pictures/` + this.props.location.state.albumid + "/thumnail"
           
        axios.get(rurl,{
            headers: {
                'Authorization': `token ${this.props.token}`
            },
            params: {
                'lastKey': this.state.lastKey
            },
        }).then(res => {
            
            this.setState({ imageData: res.data.imageData });
            this.setState({ lastKey: res.data.lastKey });
            this.setState({ count: res.data.count });
        })        
    }

    showform = (currentState) => {
        if (currentState == 'none'){
            this.setState({ xsState: 'block'})
        } else {
            this.setState({ xsState: 'none'})
        }
    }
    
    render() {

        return (
            <div> 
                <Paper sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden'}}>
                    {/* <Grid container justify="center" alignItems="stretch" spacing={3}> */}
                        <Grid item xs={12} sm={4}>
                            <Box sx={{
                                display: { xs: 'block', sm: 'none' },
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    '& > *': {
                                        m: 1,
                                    },
                                }}>
                                    <Button color="secondary" onClick={() => this.showform(this.state.xsState)}>Show/Hide Image Upload Form</Button>
                                </Box>
                            </Box>
                            <Box sx={{ display: { xs: `${this.state.xsState}`, sm: 'block' } }}>
                                <UploadForm albumid={this.props.location.state.albumid} token={this.props.token} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Box sx={{ width: "100%", height: 600, overflowY: 'scroll' }}>
                                <ImageList variant="masonry" cols={3} gap={5}>
                                    {this.state.imageData.map((item) => (
                                        <ImageListItem key={item.img} cols={item.cols || 1} onClick={()=>this.handleClick(item.s3key)}>
                                            {/* <img src={tile.img} alt={tile.title} /> */}
                                            <img src={`${item.img}`}
                                                srcSet={`${item.img}`}
                                                alt={item.title}
                                                loading="lazy"></img>
                                            <ImageListItemBar position="below" title={item.title} />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                '& > *': {
                                    m: 1,
                                },
                            }}>
                                <ButtonGroup variant="text" aria-label="text button group">
                                    {/* <Button>Previous</Button>    */}
                                    <Button onClick={this.nextPage}>Next</Button>
                                </ButtonGroup>
                            </Box>
                            <Dialog fullScreen ={this.props.isMobile}
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    aria-labelledby="responsive-dialog-title">
                                <DialogTitle id="responsive-dialog-title">
                                        {"Full Image"}
                                </DialogTitle>
                                <DialogContent>
                                    <Box sx={{ height:"100%" }}>
                                        <img src={this.state.popupUrl} width={400} height={"auto"}></img>
                                    </Box>
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