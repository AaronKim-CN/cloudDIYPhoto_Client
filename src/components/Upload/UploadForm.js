import React, { Component } from 'react';

import { TextField, Button, Typography, Paper } from '@material-ui/core';
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
    }
});

const clear = () => {
    console.log("sss")
};

class UploadForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filename: '',
            albumname: '',
            place: '',
            time: '',
            tags: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault()
        // Upload new picture to S3 and add the metadata to the DB. 
        addNewPicture(
            this.state.imagePreviewUrl,
            this.state.loadfilename,
            this.state.filename,
            this.state.place,
            this.state.tags,
            this.props.albumid,
            this.props.token
        ).then(result => {
            console.log(result)
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
                    <TextField name="filename" variant="outlined" label="filename" fullWidth value={this.state.filename} onChange={(e) => this.setState({ filename: e.target.value})} />
                    <TextField name="place" variant="outlined" label="place" fullWidth value={this.state.place} onChange={(e) => this.setState({ place: e.target.value})} />
                    <TextField name="tags" variant="outlined" label="tags" fullWidth value={this.state.tags} onChange={(e) => this.setState({ tags: e.target.value})} />
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-photo"
                        onChange={this.handleCapture}
                        type="file"
                        name="formtest"
                    />
                    <Button variant="contained" component="label" htmlFor="icon-button-photo">Upload File</Button>
                    <div>
                        <img className={classes.imagecanvas} src={this.state.imagePreviewUrl} />
                    </div>

                    {/* <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div> */}
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        )
    }
}

export default withStyles(styles, { withTheme: true })(UploadForm);