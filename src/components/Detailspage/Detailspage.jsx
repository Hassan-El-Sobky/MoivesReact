import axios from 'axios';
import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

async function getApi (type,id){
let {data}=await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=dc6c139822ae458f4c6a99536c1a087a`)
  console.log(data);
}
const Detailspage = () => {
    const params=useParams();
    console.log(params);
    getApi(params.type,params.id);
    return (
        <React.Fragment>
            <h3>asda</h3>
        </React.Fragment>
      );
}
 
export default Detailspage;