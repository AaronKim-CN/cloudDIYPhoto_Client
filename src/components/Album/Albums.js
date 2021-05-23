import React from 'react';
import axios from 'axios';
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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// one of the imagelink, all albums name

class Albums extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          text: '',
          albumnames: []
        }
    }

    handleClick = (parameter, event) => {
        console.log('this is:', this);
        //this.props.history.push('/albumdetails')
        this.props.history.push({
            pathname: '/albumdetails',
            state: {
                albumid: parameter
            } 
        })
    }

    componentDidMount() {
        axios.get(`http://localhost:9000/getalbums/`)
          .then(res => {
            let tmp = []
            for (let x in res.data){
              tmp.push(res.data[x])
            }
            this.setState({ albumnames: tmp });
            
        })
    }

    render() {
        return (
            <Container className={this.props.classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
                {this.state.albumnames.map((card) => {
                    console.log("sfsfdsf")
                    let url = "http://localhost:9000/getRandomImage/" + card
                    
                    
                return <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card className={this.props.classes.card}>
                        <CardMedia
                            className={this.props.classes.cardMedia}
                            image={url}
                            title="Image title"
                        />
                        <CardContent className={this.props.classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                            {card}
                            </Typography>
                            <Typography>
                            This is a media card. You can use this section to describe the content.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" onClick={(e) => this.handleClick(card, e)}>
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