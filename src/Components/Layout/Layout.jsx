import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
export default function Layout({userData,clearUserData}) {


  return <>
    <Navbar userData={userData} clearUserData={clearUserData}/>
    
    <div >
      <Outlet></Outlet>
    </div>
    <Footer />
  </>
}
