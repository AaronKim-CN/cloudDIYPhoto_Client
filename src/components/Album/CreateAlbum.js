import React from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';


const Styles = theme => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    }
});

class CreateAlbum extends React.Component{

    state = {
        albumnames: []
    }

    render() {
        return (
            <div> Hello World, This is Create Album Page </div>
        )
    }

}

export default withStyles(Styles, { withTheme: true })(CreateAlbum);