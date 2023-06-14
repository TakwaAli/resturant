import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { toast } from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Register() {
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = Yup.object({
    name: Yup.string().required('Name is required').min(3,'Name Must Be More than 3 Characters').max(15,'Name Must Be Less than 15 Characters'),
    email:Yup.string().required('Email is required').email('Email Must Be a Valid'),
    phone:Yup.string().required('Phone Number is required').matches(/^01[0125][0-9]{8}$/,'Phone Number Must Be a Valid'),
    password:Yup.string().required('Password is required').min(6,'Password Must Be More Than 6 Characters').max(15,'Password Must Be Less Than 15 Characters'),
    rePassword:Yup.string().required('Repassword is required').oneOf([Yup.ref('password')],'Password and Repassword Not Matched')
  })

  const formik =  useFormik({
    initialValues:{
      name: "",
      email:"",
      phone:"",
      password:"",
      rePassword:""
    },validationSchema:validate,
    onSubmit: function( values ){
      console.log('Submit',values);
      sendRegisterData( values );
    }
  });

async function sendRegisterData(obj){
  setLoading(true);
  try {
    const { data } = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup',obj)
  setLoading(false);
  console.log(data);
  if(data.message === 'success'){
    toast.success('Congratulations',{duration:3000,className:"text-success px-5 fw-bolder my-3"});
    navigate('/login');
  }} catch (error) {
    setLoading(false)
    console.log('Error : ',error);
    toast.error('Email Is Already Used',{duration:3000,className:" text-danger px-5 fw-bolder my-3"});
  }};

  function showPassword(){
    let showPass = document.getElementById('password');
    if(showPass.type === "password" ){
      showPass.type = "text";
    }else{
      showPass.type = "password";
    };
  };
  
  function showRePassword(){
    let showRePass = document.getElementById('rePassword');
    if(showRePass.type === "password"){
      showRePass.type = "text";
    }else{
      showRePass.type = "password"
    }
  };
  
  return <HelmetProvider>
    <Helmet>
    <title>Registration</title>
  </Helmet>
  
  <div className='container w-50 mx-auto '>

    <h2 className='mb-4 txt fw-bolder'>Registration </h2>

    <form onSubmit={formik.handleSubmit} >

      <label className='text-muted' htmlFor="name">Name</label>
      <input type="text" id='name' className='form-control mb-4 mt-2 w-100' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Name' name='name' value={formik.values.name}  />
      {formik.errors.name && formik.touched.name ? <div className='alert alert alert-danger text-center w-100 '>{ formik.errors.name }</div> :""}

      <label className='text-muted' htmlFor="email">Email Address</label>
      <input type="email" id='email' className='form-control mb-4 mt-2 w-100' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Email Address' name='email' value={formik.values.email}  />
      {formik.errors.email && formik.touched.email ?<div className='alert alert-danger text-center  w-100'>{ formik.errors.email }</div>:"" }

    <label className='text-muted' htmlFor="phone">Phone Number</label>
      <input type="text" id='phone' className='form-control mb-4 mt-2 w-100' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='phone' name='phone' value={formik.values.phone}  />
      {formik.errors.phone && formik.touched.phone ?<div className='alert alert-danger text-center  w-100'>{ formik.errors.phone }</div>:''}
    
      <label className='text-muted' htmlFor="password">Password</label>
      <div className="inputWithIcon position-relative">
      <input type="password" id='password' className='form-control mb-4 mt-2 w-100' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='password' name='password' value={formik.values.password}  />
      {formik.errors.password && formik.touched.password ?<div className='alert alert-danger text-center  w-100'>{ formik.errors.password }</div>:''}
      <i class="fa-solid fa-eye fs-5 position-absolute end-0 top-0 p-2 main-icon" onClick={showPassword} ></i>
      </div>

      <label className='text-muted' htmlFor="rePassword">Repassword</label>
      <div className="inputWithIcon position-relative">
      <input type="password" id='rePassword' className='form-control mb-4 mt-2 w-100' onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Repassword' name='rePassword' value={formik.values.rePassword}  />
      {formik.errors.rePassword && formik.touched.rePassword ?<div className='alert alert-danger text-center  w-100 '>{ formik.errors.rePassword }</div>:''}
      <i class="fa-solid fa-eye fs-5 position-absolute end-0 top-0 p-2 main-icon" onClick={showRePassword} ></i>
      </div>

      {loading ? <button type='button' className='btn btn-outline-success fw-bolder px-4'>
      <span class="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
        </button> : <button disabled={!formik.isValid } type='submit' className='btn btn-outline-success fw-bolder'>Register</button> }
        <h5 className='text-muted  py-3'>Already have an account ? <Link className='text-decoration-none' to={'/login'}><span className='text-white signIn '>Sign In</span></Link></h5>

        </form>
    </div>
  
  
  </HelmetProvider>
}
