import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({userData,logout}) {
 
    return (
        <div className=' p-3 d-flex justify-content-between'>
            <ul className='list-unstyled d-flex'>
              <li className='px-2 h4'>
             <NavLink to='/Home'>Noxe</NavLink>
              </li> 
            
              {userData?<>
                <li className='px-2'>
                
                <NavLink to='/Home'>Home</NavLink>
              </li>  
              <li className='px-2'>
                <NavLink to='/Movies'>Movies</NavLink>
              </li>  
              <li className='px-2'>
                <NavLink to='/About'>About</NavLink>
              </li>  
              <li className='px-2'>
                <NavLink to='/Tvshows'>Tvshows</NavLink>
              </li>
              </>:''}
                
            </ul>
          
            <ul className='list-unstyled d-flex'>
               <p>{userData?userData.first_name:'f'}</p>
            <i className="fab fa-facebook m-1"></i>
            <i className="fab fa-instagram m-1"></i>
            <i className="fab fa-youtube m-1"></i>
            <i className="fab fa-spotify m-1"></i>

              <li className='px-2'>
                  <NavLink to='/Login'>Login</NavLink>
                </li>  
                <li className='px-2'>
                  <NavLink to='/Register'>Register</NavLink>
                </li>  
                <li onClick={logout} className='px-2'>
                  <NavLink to='/Login'>Logout</NavLink>
                </li>  
                
            </ul>
        </div>
    );
}

export default Navbar;