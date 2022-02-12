import React, { Component } from 'react';
import { addNewPicture } from '../Lib/methods';

//MUI5.0
import { TextField, Button, Typography, Paper, LinearProgress, Box } from '@mui/material';

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

        return (

            <Paper sx={{padding:2}}>
                <Box component='form' 
                    autoComplete="off" 
                    noValidate 
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        '& .MuiTextField-root': { m: 1 }
                    }} 
                    onSubmit={this.handleSubmit}>

                    <Typography sx={{ padding:1 }} variant="h6">{ 'Add Photo to ' + this.props.albumid }</Typography>
                    <Button sx={{ padding:1 }} variant="contained" component="label" htmlFor="icon-button-photo">Upload File</Button>
                    <Box>
                        <img src={this.state.imagePreviewUrl} style={{ maxWidth: '100%',maxHeight: '100%',width:'auto',height: 'auto' }} />
                    </Box>
                    <TextField
                        accept="image/*"
                        sx={{display: 'none'}}
                        id="icon-button-photo"
                        onChange={this.handleCapture}
                        type="file"
                        name="formtest"
                    />
                    <TextField name="place" variant="outlined" label="place" fullWidth value={this.state.place} onChange={(e) => this.setState({ place: e.target.value})} />
                    <TextField name="tags" variant="outlined" label="tags" fullWidth value={this.state.tags} onChange={(e) => this.setState({ tags: e.target.value})} />
                    <TextField name="filename" variant="outlined" label="filename" fullWidth value={this.state.filename} onChange={(e) => this.setState({ filename: e.target.value})} />
                    <Button variant="contained" sx={{ borderBottom:5 }} color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Box id="progressbar" sx={{ width: '100%',
                                                height: 30,
                                                borderRadius: 5,
                                                display: 'none'}}>
                        <LinearProgress variant="determinate" value={this.state.progress} />
                    </Box>
                    <Button variant="contained" color="secondary" size="small" onClick={this.clear} fullWidth>Clear</Button>
                </Box>
            </Paper>
        )
    }
}

export default UploadForm;