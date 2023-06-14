import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export default function Notfound() {
  return <HelmetProvider>
    <Helmet>
      <title>Not Found 404</title>
    </Helmet>
  <div className="container">

  <div className="row justify-content-center">
      <div className='col-12'>
      <img src={require("../../images/error.png")} className="w-100 error-img" alt=""/>
      </div>
      
    </div>
  </div>
    
  
  
  
  
  </HelmetProvider>
}
