import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeItems({item}) {



  return <>
    
    <div className="col-lg-3 col-md-8  col-sm-8 g-5 ">
      <Link to={`/moviedetails/ ${item.recipe_id}/${item.media_type}`} className='text-decoration-none text-info'>
      <div className="item position-relative ">
      
        {item.image_url? <img src={ item.image_url} className='w-100 main-img' alt={item.title} /> : <img src={"https://image.tmdb.org/t/p/w500" + item.profile_path} className='w-100 ' alt={item.title} /> }
       
       
        
        {item.title? <h3 className='h5 text-center pt-2 title'> {item.title.split(" ").slice(0,3).join(" ")}</h3> : <h3 className='h5 text-center pt-2'> {item.title.split(" ").slice(0,3).join(" ")}</h3> }
        
        {item.publisher ? <div className="vote position-absolute top-0 end-0 p-1 fw-bolder w-100">{item.publisher}</div> : ''}
      </div>
      </Link>
    </div> 
  
  </>
}
