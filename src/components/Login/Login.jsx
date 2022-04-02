import React, { useEffect,useState } from 'react';
import  Joi  from 'joi';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Login(props) {
    let histroy=useNavigate()
    let[apiError,setApiErr]=useState('');
    let[Loader,setLoader]=useState(false);
    let[errorsList,setErrorsList]=useState([]);
   let[userCred,setUserCred]=useState({
       email:'',
       password:''
   });
   
   function validtion(){
       let schema=Joi.object({
           email:Joi.string().required().email({tlds:{allow:['eg','com','net']}}),
           password:Joi.string().required()
       })
       return schema.validate(userCred,{abortEarly:false})
   }
 
   async function handleSubmit(e)
    {
          e.preventDefault();
          let validationStatus=validtion();
          if(validationStatus.error) {
            //   console.log(validationStatus.error.details);
              setErrorsList(validationStatus.error.details)
              toast('🦄 Wow so easy!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
          } else {
               setLoader(true);
               let {data}=await axios.post("https://routeegypt.herokuapp.com/signin",userCred);
               console.log(data);
               if(data.message=="success")
               {   
                   localStorage.setItem("userData",JSON.stringify(data.user));
                   props.getUserData();
                   histroy('/Home')
                   setLoader(false);
                   
               } else {
                setApiErr(data.message);
                setLoader(false);
               }
          }
    }

    function getCred(e){
       //Clone
       let userClone={...userCred};
       //edit
       userClone[e.target.name]=e.target.value;
       //update
        setUserCred(userClone);
        console.log(userCred);       
    }
    return (
        <div>
            
            <h3 className='h1'>Login</h3>
        

            {errorsList.map((err,idx)=><div key={idx} className='alert alert-danger'>{err.message}</div>)}
            {apiError&& <div className='alert alert-danger'>{apiError}</div>}

            <form onSubmit={handleSubmit}>
            <div className='my-2'>
                <label htmlFor="email">Email</label>
                <input onChange={getCred} className="form-control" type="text" name='email' />
                </div>
                <div className='my-2'>
                <label htmlFor="password">Password</label>
                <input onChange={getCred} className="form-control" type="text" name='password' />
                </div>
                <div>
                    <button className='btn btn-primary'>{Loader?<i className='fa fa-spinner fa-spin'></i>:'Login'}</button>
                </div>
            </form>
        </div>
    );
}

export default Login;