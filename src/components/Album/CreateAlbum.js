import React from 'react';
import { withRouter } from 'react-router-dom';
import { createDicrectory } from '../Lib/methods';

//MUI5.0
import { TextField, Button, Typography, Paper } from '@mui/material';

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
        createDicrectory( this.state.albumid, this.state.displayname, this.state.discription, this.props.token).then(result => {
            if(result.status == "200") {
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

        return (

            <Paper>
                <form autoComplete="off" noValidate sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }} onSubmit={this.handleSubmit}>
                    <Typography sx={{ padding:1 }} variant="h6">{ 'Create a new Album' }</Typography>
                    <TextField sx={{ padding:1 }} name="albumid" variant="outlined" label="albumid" fullWidth value={this.state.albumid} onChange={(e) => this.setState({ albumid: e.target.value})} />
                    <TextField sx={{ padding:1 }} name="displayname" variant="outlined" label="displayname" fullWidth value={this.state.displayname} onChange={(e) => this.setState({ displayname: e.target.value})} />
                    <TextField sx={{ padding:1 }} name="discription" variant="outlined" label="discription" fullWidth value={this.state.discription} onChange={(e) => this.setState({ discription: e.target.value})} />
                    <Button sx={{ border:10 }} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button sx={{ border:10 }} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        )
    }

}

export default withRouter(CreateAlbum);