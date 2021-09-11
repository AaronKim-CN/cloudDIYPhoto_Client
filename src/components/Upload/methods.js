import axios from 'axios';
import config from '../../config.json';

export async function addNewPicture(file, loadfilename, filename, place, tags, albumid, accessToken) {
    var formData = new FormData();
    formData.append("file", file);
    formData.append("loadfilename", loadfilename);
    formData.append("filename", filename);
    formData.append("place", place);
    formData.append("tags",tags);

    var result = ''
    console.log("front data");
    console.log(loadfilename);
    console.log(file);
    console.log(filename);
    console.log(place);
    await axios.post(`${config.API_Endpoint}/pictures/${albumid}/upload`,formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `token ${accessToken}`
      }
    }).then(res => {
        result = res;
    }).catch((error) => {
        console.log("Error happens");
        result = error;
    })

    return result
    
}