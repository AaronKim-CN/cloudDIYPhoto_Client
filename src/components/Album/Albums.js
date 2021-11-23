import React from 'react';
import axios from 'axios';
import config from '../../config.json';

import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const Styles = theme => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    }
});


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
            <Container className={this.props.classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
                {this.state.albumnames.map((album) => {
                    
                    //let url = `${config.API_Endpoint}/getRandomImage/` + album.albumid
                    // Get signed URL
                    let url = `${config.API_Endpoint}/pictures/` + album.albumid + '/random'

                    return <Grid item key={album.albumid} xs={12} sm={6} md={4}>
                            <Card className={this.props.classes.card}>
                            <CardMedia
                                className={this.props.classes.cardMedia}
                                image={url}
                                title="Image title"
                            />
                            <CardContent className={this.props.classes.cardContent}>
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

//export default withStyles(Styles, { withTheme: true })(Albums);
export default withRouter(withStyles(Styles, { withTheme: true })(Albums));