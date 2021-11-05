import React, { Component } from 'react';

import { TextField, Button, Typography, Paper } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import { addNewPicture } from '../Lib/methods';

const styles = (theme) => ({
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
    },
    input: {
        display: 'none'
    },
    imagecanvas: {
        width:'auto',
        height: 'auto',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    progressbar: {
        width: '100%',
        height: 20,
        borderRadius: 5,
        display: 'none'
    }
});

function refreshPage() {
    window.location.reload(false);
}

class UploadForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filename: '',
            albumname: '',
            place: '',
            time: '',
            tags: '',
            progress: 0
        }
    }

    clear = () => {
        console.log("sss")
        this.setState({
            imagePreviewUrl: '',
            filename: '',
            place: '',
            tags: ''
        })
    };

    handleSubmit = async e => {
        e.preventDefault()
        let target = document.getElementById("progressbar");
        target.style.display = "block";
        // Upload new picture to S3 and add the metadata to the DB. 
        addNewPicture(
            this.state.imagePreviewUrl,
            this.state.loadfilename,
            this.state.filename,
            this.state.place,
            this.state.tags,
            this.props.albumid,
            this.props.token,
            (event) => {
                this.setState({
                    progress: Math.round((100 * event.loaded) / event.total)
                });
            }
        ).then(result => {
            console.log(result)
            refreshPage()
        })

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

            <Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={this.handleSubmit}>
                    <Typography variant="h6">{ 'Add Photo to ' + this.props.albumid }</Typography>
                    <Button variant="contained" component="label" htmlFor="icon-button-photo">Upload File</Button>
                    <div>
                        <img className={classes.imagecanvas} src={this.state.imagePreviewUrl} />
                    </div>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-photo"
                        onChange={this.handleCapture}
                        type="file"
                        name="formtest"
                    />

                    <TextField name="place" variant="outlined" label="place" fullWidth value={this.state.place} onChange={(e) => this.setState({ place: e.target.value})} />
                    <TextField name="tags" variant="outlined" label="tags" fullWidth value={this.state.tags} onChange={(e) => this.setState({ tags: e.target.value})} />
                    <TextField name="filename" variant="outlined" label="filename" fullWidth value={this.state.filename} onChange={(e) => this.setState({ filename: e.target.value})} />

                    {/* <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div> */}
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <div id="progressbar" className={classes.progressbar}>
                        <LinearProgress variant="determinate" value={this.state.progress} />
                    </div>
                    <Button variant="contained" color="secondary" size="small" onClick={this.clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        )
    }
}

export default withStyles(styles, { withTheme: true })(UploadForm);