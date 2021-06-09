import axios from 'axios';
import config from '../../config.json';

export async function uploadtos3(file, filename, albumid) {
    var formData = new FormData();
    formData.append("file", file);
    formData.append("filename", filename);

    var result = ''
    
    await axios.post(`${config.API_Endpoint}/upload/${albumid}`,formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
        //'enctype': 'multipart/form-data'
      }
    }).then(res => {
        result = res;
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