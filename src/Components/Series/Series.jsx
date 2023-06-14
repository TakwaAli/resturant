import  axios  from 'axios';
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Series() {

    const [series, setSeries] = useState(null);
    const numbers = new Array(8).fill(1).map((element,index)=> index +1);
    const mediaType = 'tv';

    const [visible, setVisible] = useState(8);

    async function getSeries(type){
    try {
        const {data} = await axios.get(`https://forkify-api.herokuapp.com/api/search?q=${type}`)
        setSeries(data.recipes);
        console.log(data);
    } catch (error) {
        console.log('Error : ',error);
    }
}

    useEffect(()=>{
        getSeries("beef");
    },[])

    function showMore(){
        setVisible((nextValue)=> nextValue+4)
        }

    return <HelmetProvider>
    <Helmet>
        <title>beef</title>
    </Helmet>
    
    {series? <div className="container">
    <div className="row py-3 d-flex justify-content-center align-content-center ">
        {series.slice(0,visible).map((series,index)=> <div key={index} className="col-lg-3 col-md-6  col-sm-6 gy-4 gx-5 ">
    <Link to={`/moviedetails/${series.recipe_id}/${mediaType}`} className='text-decoration-none txt'>
    <div className="movie position-relative ">
        <img src={series.image_url} className='w-100 main-img' alt={series.title} />
        <h3 className='h5 text-center pt-2'> {series.title}</h3> 
        
        <div className="vote position-absolute top-0 end-0 p-1 text-white fw-bolder">{series.social_rank.toFixed(1)}</div> 
    </div>
    </Link>
    </div> )}
    </div>

    {visible !== series.length ? <div className='d-flex justify-content-center align-items-center'> <button onClick={showMore} className='btn btn-outline-success fw-bolder w-50 m-auto mt-4'>Show More</button></div>
    : ''}

    </div> : <LoadingScreen/>}

    {numbers? <nav aria-label="Page navigation example " className='my-5 d-flex justify-content-center align-items-center '>
        <ul class="pagination">
{/*     {numbers.map((page,index)=> <> <li key={index} onClick={()=>getSeries(page)} class="page-item ">
        <Link class="page-link fw-bolder text-info" to={''}>{page}</Link>
    </li> </>)} */}
    </ul>
</nav> : <LoadingScreen/>}

    </HelmetProvider>
}
