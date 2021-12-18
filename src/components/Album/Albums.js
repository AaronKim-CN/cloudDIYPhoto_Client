import React from 'react';
import axios from 'axios';
import config from '../../config.json';

import { withRouter } from 'react-router-dom';

//MUI5.0
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

class Albums extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          text: '',
          albumnames: [],
          urls: {}
        }
    }

    handleClick = (parameter, event) => {
        
        //this.props.history.push('/albumdetails')
        this.props.history.push({
            pathname: '/albumdetails',
            state: {
                albumid: parameter
            } 
        })
    }

    // Call to DB first
    componentDidMount() {
        
        axios.get(`${config.API_Endpoint}/albums/`, {
            headers: {
                'Authorization': `token ${this.props.token}`
            }
        })
        .then(res => {
            this.setState({ albumnames: res.data });
        })
    }

    render() {
        return (
           // <Container className={this.props.classes.cardGrid} maxWidth="md">
           <Container sx={{ paddingTop: 8, paddingBottom: 8}} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
                {this.state.albumnames.map((album) => {
                    
                    //let url = `${config.API_Endpoint}/getRandomImage/` + album.albumid
                    // Get signed URL
                    let url = `${config.API_Endpoint}/pictures/` + album.albumid + '/random'

                    return <Grid item key={album.albumid} xs={12} sm={6} md={4}>
                            
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                sx={{paddingTop: '56.25%'}}
                                image={url}
                                title="Image title"
                            />
                            <CardContent sx={{flexGrow: 1}}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {album.displayname}
                                </Typography>
                                <Typography>
                                    {album.discription}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={(e) => this.handleClick(album.albumid, e)}>
                                View
                                </Button>
                            </CardActions>
                            </Card>
                        </Grid>
                    }
            )}
          </Grid>
        </Container>
        )
    }
}

export default withRouter(Albums);