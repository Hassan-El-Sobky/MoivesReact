import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { NavLink } from 'react-router-dom';

function Home(props) {
   let [allMoives,setMoives]=useState([]);
   let [allTvshows,setTvshows]=useState([]);
   let [persons,setPersons]=useState([]);
   async function getAlltrendingMoive(shows,callBack){
      let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${shows}/day?api_key=dc6c139822ae458f4c6a99536c1a087a`);
      console.log(data.results);
    //   setMoives(data.results);
      callBack(data.results)
    }
    
    useEffect(()=>{
        getAlltrendingMoive('moive',setMoives);
        getAlltrendingMoive('tv',setTvshows);
        getAlltrendingMoive('person',setPersons);
        },[])
    return (
        <React.Fragment>
        <div className='row'>
            <div className="col-md-4">
                <div  className='w-25 bdr'></div>
                <h2>Trending <br /> Movies <br /> to Watch Now</h2>
                <span className='text-muted'>Most watched moives by days</span>
                <div className='bdr'></div>
            </div>
             {allMoives.map((moive,idx)=>{ return(
            
        <div key={idx} className='col-md-2'>
                <NavLink to={`/showdetail/movie/${moive.id}`}>
            <img className='w-100' src={`https://image.tmdb.org/t/p/w500/${moive.poster_path}`} alt="" />
                 <h5 className='py-2'>{moive.title}</h5>
                 </NavLink>
        </div>
                 )})}
                 </div>
 <hr />
                 <div className='row'>
            <div className="col-md-4">
                <div  className='w-25 bdr'></div>
                <h2>Trending <br /> Tv Shows <br /> to Watch Now</h2>
                <span className='text-muted'>Most watched moives by days</span>
                <div className='bdr'></div>
            </div>
             {allTvshows.map((moive,idx)=>{ return(
        <div key={idx} className='col-md-2'>
            <img className='w-100' src={`https://image.tmdb.org/t/p/w500/${moive.poster_path}`} alt="" />
                 <h5 className='py-2'>{moive.name}</h5>
        </div>
                 )})}
                 </div>

                 <hr />
                 <div className='row'>
            <div className="col-md-4">
                <div  className='w-25 bdr'></div>
                <h2>Trending <br /> Persons <br /> to Watch Now</h2>
                <span className='text-muted'>Most watched moives by days</span>
                <div className='bdr'></div>
            </div>
             {persons.map((moive,idx)=>{ return(
        <div key={idx} className='col-md-2'>
            {moive.profile_path? <img className='w-100' src={`https://image.tmdb.org/t/p/w500/${moive.profile_path}`} alt="" />:'Img Not found'}
                 <h5 className='py-2'>{moive.name}</h5>
        </div>
                 )})}
                 </div>

                 </React.Fragment>
    );
}

export default Home;