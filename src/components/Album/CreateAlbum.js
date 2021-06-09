import React from 'react';

import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
// WithRouter to us Redicrect. 

import { createDicrectory } from './methods';


const Styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    paper: {
        padding: theme.spacing(2),
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
    buttonSubmit: {
        marginBottom: 10,
    }
});

const clear = () => {
    console.log("sss")
};

class CreateAlbum extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            albumid: '',
            displayname: '',
            discription: '',
            time: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault()
        
        // Upload file to S3
        createDicrectory( this.state.albumid, this.state.displayname, this.state.discription).then(result => {
            if(result.status === "200") {
                console.log("Successed");
                console.log(result);
                console.log("the albumid in client");
                console.log(this.state.albumid);
                this.props.history.push({
                    pathname: '/albumdetails',
                    state: {
                        albumid: this.state.albumid
                    } 
                })
            }

        });

    }

    handleCapture = ({ target }) => {
        const fileReader = new FileReader();
        //const name = target.accept.includes('image') ? 'images' : 'videos';

        fileReader.readAsDataURL(target.files[0]);
        var filename = target.files[0].name;
        
        fileReader.onloadend = (event) => {
  
            this.setState({
                imagePreviewUrl: fileReader.result,
                loadfilename: filename
            });

        };
    }; 

    render() {

        const { classes } = this.props;

        return (

            <Paper>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={this.handleSubmit}>
                    <Typography variant="h6">{ 'Create a new Album' }</Typography>
                    <TextField name="albumid" variant="outlined" label="albumid" fullWidth value={this.state.albumid} onChange={(e) => this.setState({ albumid: e.target.value})} />
                    <TextField name="displayname" variant="outlined" label="displayname" fullWidth value={this.state.displayname} onChange={(e) => this.setState({ displayname: e.target.value})} />
                    <TextField name="discription" variant="outlined" label="discription" fullWidth value={this.state.discription} onChange={(e) => this.setState({ discription: e.target.value})} />
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        )
    }

}

export default withRouter(withStyles(Styles, { withTheme: true })(CreateAlbum));