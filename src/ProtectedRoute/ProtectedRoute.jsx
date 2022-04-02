import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import Movies from './../components/Movies/Movies';

function ProtectedRoute(props) {
let x=(localStorage.getItem("userData"));
return x?<Outlet/>:<Navigate to='/Home'/>
    
        

       
        
}

export default ProtectedRoute;