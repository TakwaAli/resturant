import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';

export default function MovieDetails() {

  const [details, setDetails] = useState({});

  const {id,mediaType} = useParams();
console.log(id,"id",mediaType,"media");
  async function getTrending(id){
    try {
      const {data} = await axios.get(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
      setDetails(data.recipe);
        console.log(data.recipe);
    } catch (error) {
      console.log('Error : ',error);
    }
  }
  

  useEffect(()=>{
    getTrending(id);
  },[])



  return <HelmetProvider>
    <Helmet>
      <title>Popcornflix Details</title>
    </Helmet>

    <div className="container  d-flex justify-content-center align-items-center mt-5">
      <div className="row g-3 ">

        <div className="col-lg-3 col-md-11   col-sm-12  d-flex justify-content-center align-items-center ">
        <img src={ details.image_url} className='w-100 ' alt={details.title} /> 
        </div>

        <div className="col-lg-9 col-md-11 col-sm-12 px-5  m-auto d-flex  justify-content-center ">
          <div className="item-text">
          <h2 className='h3  my-2 title'>{details.title} </h2>
          <p className='text-muted mt-5 txt'>publisher :<span className=' mx-2 txt'>{details.publisher}</span> </p>
         
          {details.publisher_url? <h4 className='h6 text-muted '>publisher_url : <span className='txt mx-2'><Link className='txt mx-2' to={`${details.publisher_url}`}>{details.publisher_url}</Link> </span></h4>:''}
          {details.source_url? <h4 className='h6 text-muted '>source_url : <span className=' mx-2 txt'><Link className=' mx-2 txt'>{`${details.source_url}`}</Link> </span></h4>:''}
          {details.social_rank?<h4 className='h6 text-muted '>Social Rank : <span className=' mx-2 txt'>{details.social_rank}</span></h4>:''}
          </div>
         
        </div>
      </div>
    </div>






    </HelmetProvider>
}
