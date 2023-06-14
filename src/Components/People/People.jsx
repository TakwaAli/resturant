import  axios  from 'axios';
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function People() {

    const [people, setPeople] = useState(null);
    const numbers = new Array(6).fill(1).map((element,index)=> index +1);
    const mediaType = 'person';

    const [visible, setVisible] = useState(8);

    async function getPeople(type){
    try {
        const {data} = await axios.get(`https://forkify-api.herokuapp.com/api/search?q=${type}`)
        setPeople(data.recipes);
        console.log(data.recipes);
    } catch (error) {
        console.log('Error : ',error);
    }
}

    useEffect(()=>{
    getPeople("salad");
    },[])

    const showMore = () => {
        setVisible((nextValue)=> nextValue+4)
        }

    return <HelmetProvider>
    <Helmet>
        <title>Characters</title>
    </Helmet>
    
    {people? <div className="container">
    <div className="row py-3 d-flex justify-content-center align-content-center ">
        {people.slice(0,visible).map((people,index)=> <div key={index} className="col-lg-3 col-md-6  col-sm-6 gy-4 gx-5 ">
    <Link to={`/moviedetails/${people.recipe_id}/${mediaType}`} className='text-decoration-none txt'>
    <div className="movie position-relative ">
        <img src={people.image_url} className='w-100 main-img' alt={people.title} />
        <h3 className='h5 text-center pt-2'> {people.title}</h3> 
        
        <div className="vote position-absolute top-0 end-0 p-1 text-white fw-bolder">{people.social_rank.toFixed(1)}</div> 
    </div>
    </Link>
    </div> )}
    </div>

    {visible !== people.length ? <div className='d-flex justify-content-center align-items-center'> <button onClick={showMore} className='btn btn-outline-success fw-bolder w-50 m-auto mt-4'>Show More</button></div>
    : ''}

    </div> : <LoadingScreen/>}

    {numbers? <nav aria-label="Page navigation example " className='my-5 d-flex justify-content-center align-items-center '>
      {/*   <ul class="pagination">
    {numbers.map((page,index)=> <> <li key={index} onClick={()=>getPeople(page)} class="page-item ">
        <Link class="page-link fw-bolder text-info" to={''}>{page}</Link>
    </li> </>)}
    </ul> */}
</nav> : <LoadingScreen/>}

    </HelmetProvider>
}
