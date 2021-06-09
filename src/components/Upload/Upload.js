import React, { Component, Fragment } from 'react';
import config from '../../config.json';
import axios from 'axios';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
//import Videocam from '@material-ui/icons/Videocam';


const styles = (theme) => ({
    input: {
        display: 'none'
    }
});

class MediaCapture extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired
    };

    state = {
        images: [],
        videos: [],
        imagePreviewUrl: ""
    };

    handleCapture = ({ target }) => {
      const fileReader = new FileReader();
      const name = target.accept.includes('image') ? 'images' : 'videos';

      fileReader.readAsDataURL(target.files[0]);
      fileReader.onloadend = (event) => {

      this.setState({
        imagePreviewUrl: fileReader.result
      });

      const fileReader2 = new FileReader();
      fileReader2.readAsDataURL(target.files[0]);
      
      fileReader2.onloadend = (event) => {
        console.log(event);
        var formData = new FormData();
        formData.append("file", event.target.result);
        // for (var key of formData.entries()) {
        //   console.log(key[0] + ', ' + key[1]);
        // }
        axios.post(`${config.API_Endpoint}/upload/`,formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
            //'enctype': 'multipart/form-data'
          }
        }).then(res => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        })

      }

    };
  };

  render() {
      const { classes } = this.props;

      return (
          <Fragment>
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
                <img src={this.state.imagePreviewUrl} />
              </div>

              {/* <input
                    accept="video/*"
                    capture="camcorder"
                    className={classes.input}
                    id="icon-button-video"
                    onChange={this.handleCapture}
                    type="file"
              />
              <label htmlFor="icon-button-video">
                  <IconButton color="primary" component="span">
                      <Videocam />
                  </IconButton>
              </label> */}

          </Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(MediaCapture);