import React, { useState,useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './../Home/Home';
import Login from './../Login/Login';
import Movies from './../Movies/Movies';
import Navbar from './../Navbar/Navbar';
import Register from './../Register/Register';
import Tvshows from './../Tvshows/Tvshows';
import Notfound from './../Notfound/Notfound';
import About from './../About/About';
import { ToastContainer,toast } from 'react-toastify';
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute';
import Detailspage from '../Detailspage/Detailspage';




function App(props) {
       let histroy=useNavigate();
    let[loginData,setLoginData]=useState(null);
    useEffect(()=>{
        if(localStorage.getItem("userData")){
            
            getUserData();
        }
       
    },[])
    function getUserData(){
        let userData= JSON.parse( localStorage.getItem("userData"));
        setLoginData(userData);
    }

    function logout(){
        localStorage.removeItem("userData");
        setLoginData(null);
     histroy('/Login');
    }
    return (
        
        <React.Fragment>
           <Navbar logout={logout} userData={loginData}/>
        
        

           <div className="container">
        
          <Routes>

              <Route path='/Home' element={<Home/>} />
              <Route path='/Login' element={<Login getUserData={getUserData}/>} />
              <Route path='/About' element={<About/>} />
              <Route path='/Register' element={<Register/>}/>
               <Route path='/' element={<Navigate to='/home'/>}/>
               <Route path='/*' element={<Notfound/>} />
              
              {/* <ProtectedRoute path='' element={<Movies/>} /> */}
              <Route element={<ProtectedRoute/>}>

              <Route path='/Movies' element={<Movies/>} />
               <Route path='/showdetail/:type/:id' element={<Detailspage/>} />
              </Route >
               <Route path='/Tvshows' element={<Tvshows/>}/>
            
          </Routes>
          </div>
        </React.Fragment>

    );
}

export default App;