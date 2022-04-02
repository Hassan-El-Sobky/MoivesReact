import axios from 'axios';
import React, { useState } from 'react';
import Joi, { string, valid } from 'joi';
import { useNavigate} from 'react-router-dom';
function Register(props) {
    let[loader,setLoader]=useState(false);
    let[errors,setErrors]=useState('');
    let[errorsList,setErrorsList]=useState([]);
    
    let histroy=useNavigate()
     let[user,setUser]=useState({
         first_name:"",
         last_name:"",
         age:"",
         email:"",
         password:""
     })

     function validation() {
         let schema=Joi.object({
            first_name:Joi.string().alphanum().min(3).max(10).required(),
            last_name:Joi.string().alphanum().min(3).max(10).required(),
            age:Joi.number().min(16).max(65).required(),
            email:Joi.string().required().email({tlds:{allow:['com','net','eg']}}),
            password:Joi.string().required()
         });

          return schema.validate(user,{abortEarly:false});
     }
    function getUser(e){
       let usClone={...user};
       usClone[e.target.name]=e.target.value
       setUser(usClone)
        console.log(user);
    }

   async function onSubmit(e)
    { 
        e.preventDefault()
        let validationState=validation();
         console.log(validationState);

         if(validationState.error) {
               setErrorsList(validationState.error.details)
               console.log(errorsList);
         } else {
            setLoader(true);
            console.log("submit");
            let {data}= await axios.post("https://routeegypt.herokuapp.com/signup",user);
            console.log(data);
            if(data.message=="success"){
               histroy('/login')
                setLoader(false)   
            } else {
               setErrors(data.message);
               setLoader(false)
            }
         }
        
    }
    return (
        <div>
            
            <h3 className='h1'>Registeration Form</h3>
            {errorsList.map((err,idx)=><div key={idx} className='alert alert-danger'>{err.message}</div>)}
            {errors&& <div className='alert alert-danger'>{errors}</div>}
            <form onSubmit={onSubmit}>
                <div className='my-2'>
                <label htmlFor="first_name">First Name</label>
                <input onChange={getUser} className="form-control" type="text" name='first_name' />
                </div>
                <div className='my-2'>
                <label htmlFor="last_name">Last Name</label>
                <input onChange={getUser} className="form-control" type="text" name='last_name' />
                </div>
              
                <div className='my-2'>
                <label htmlFor="age">age</label>
                <input onChange={getUser} className="form-control" type="text" name='age' />
                </div>

                <div className='my-2'>
                <label htmlFor="email">Email</label>
                <input onChange={getUser} className="form-control" type="text" name='email' />
                </div>

                <div className='my-2'>
                <label htmlFor="password">Password</label>
                <input onChange={getUser} className="form-control" type="text" name='password' />
                </div>

               <div className="my-2">
                   <button type='submit' className='btn btn-primary'>
                       {loader?<i className='fa fa-spinner fa-spin'></i>:'Register'}
                       </button>
               </div>
            </form>
        </div>
    );
}

export default Register;