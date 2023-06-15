import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { toast } from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Login({saveUserData}) {
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = Yup.object({
    email:Yup.string().required('Email is required').email('Email Must Be a Valid'),
    password:Yup.string().required('Password is required').min(6,'Password Must Be More Than 6 Characters').max(15,'Password Must Be Less Than 15 Characters'),
  })

  const formik =  useFormik({
    initialValues:{
      email:"",
      password:"",
    },validationSchema:validate,
    onSubmit: function( values ){
      console.log('Submit',values);
      sendLoginData( values );
    }
  });

async function sendLoginData(obj){
  setLoading(true);
  try {
    const { data } = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',obj)
  setLoading(false);
  console.log(data);
  if(data.message === 'success'){
    toast.success('Welcome To Popcornflix',{duration:3000,className:"txt px-5 fw-bolder my-3",iconTheme: {
      primary: '#0dcaf0;',
      secondary: '#fff',
    },});
    localStorage.setItem('tkn',data.token);
    saveUserData();
    navigate('/');
  }} catch (error) {
    setLoading(false)
    console.log('Error : ',error);
    toast.error('Email Or Password is Wrong',{duration:3000,className:" text-danger px-5 fw-bolder my-3"});
  }};

  function showPassword(){
    let showPass = document.getElementById('password');
    if(showPass.type === "password" ){
      showPass.type = "text";
    }else{
      showPass.type = "password";
    };
  };
  
  return <HelmetProvider>
    <Helmet>
    <title>Login</title>
  </Helmet>
  
  <div className='container w-100   mx-auto my-3'>

    <h2 className='mb-4 txt fw-bolder'>Login</h2>

    <form className='m-5' onSubmit={formik.handleSubmit} >
      
      <label className='text-muted' htmlFor="email">Email Address</label>
      <input type="email" id='email' className='form-control mb-4 mt-2 w-75' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Email Address' name='email' value={formik.values.email}  />
      {formik.errors.email && formik.touched.email ?<div className='alert alert-danger w-75 text-center'>{ formik.errors.email }</div>:"" }

      <label className='text-muted' htmlFor="password">Password</label>
      <div className="inputWithIcon position-relative">
      <input type="password" id='password' className='form-control mb-4 mt-2 w-75' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='password' name='password' value={formik.values.password}  />
      {formik.errors.password && formik.touched.password ?<div className='alert alert-danger w-75 text-center '>{ formik.errors.password }</div>:''}
      <i class="fa-solid fa-eye fs-5 position-absolute end-0 top-0 p-2 main-icon" onClick={showPassword} ></i>
      </div>

      {loading ? <button type='button' className='btn btn-outline-success fw-bolder px-4'>
        <span class="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
        </button> : <button disabled={!formik.isValid } type='submit' className='btn btn-outtxt fw-bolder text-white signIn'>Login</button> }
        <h5 className='text-muted  py-4'> Create New Acount <Link className='text-decoration-none' to={'/register'}><span className=' text-white  signIn '>Register</span></Link></h5>

        </form>
    </div>
  
  </HelmetProvider>
}
