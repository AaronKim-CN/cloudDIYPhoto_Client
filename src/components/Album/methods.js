import axios from 'axios';
import config from '../../config.json';

export async function createDicrectory(albumid, displayname, discription) {
    
    var data = {};
    data['albumid'] = albumid;
    data['displayname'] = displayname;
    data['discription'] = discription;

    var result = ''
    
    await axios.post(`${config.API_Endpoint}/albums/`,data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
        result = res;
        console.log(res);
        
    }).catch((error) => {
        console.log("Error happens");
        result = error;
    })

    return result
    
}

export async function inserttoMongoDB(albumname, filename, place, s3key, tags) {
    // Call db insert API

    const data = {
        album: albumname,
        filename: filename,
        place: place,
        s3key: s3key,
        tags: tags
    }

    await axios.post(`${config.API_Endpoint}/pictures/`, data).then(function (response) {
        console.log("Post request");
        console.log(response);
    })
    console.log("Insert images to Mongo DB");
    return "ok"
}