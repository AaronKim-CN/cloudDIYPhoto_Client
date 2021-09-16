import axios from 'axios';
import config from '../../config.json';

export async function createDicrectory(albumid, displayname, discription, accessToken) {
    
  var data = {};
  data['albumid'] = albumid;
  data['displayname'] = displayname;
  data['discription'] = discription;

  var result = ''
  
  await axios.post(`${config.API_Endpoint}/albums/`,data, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${accessToken}`
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

export async function addNewPicture(file, loadfilename, filename, place, tags, albumid, accessToken) {
    var formData = new FormData();
    formData.append("file", file);
    formData.append("loadfilename", loadfilename);
    formData.append("filename", filename);
    formData.append("place", place);
    formData.append("tags",tags);

    var result = ''

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