import  axios  from 'axios';
import React, { useEffect, useState } from 'react'
import HomeItems from '../HomeItems/HomeItems';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../Header/Header';


export default function Home() {

  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [people, setPeople] = useState([]);
  const [searchTitle, setsearchTitle] = useState("")
  async function getTrending(mediaType,usestate){
    try {
      const {data} = await axios.get(`https://forkify-api.herokuapp.com/api/search?q=${mediaType}`)
        usestate(data);
        console.log(data);
    } catch (error) {
      console.log('Error : ',error);
    }
  }

  useEffect(()=>{
    getTrending('beef',setMovies);
    getTrending('salad',setSeries);
    getTrending('pizza',setPeople);
  },[])


  return(
  <>
  <Header></Header>
  <HelmetProvider>
    <Helmet>
    <title>Cooker</title>
    </Helmet>
    <div className="d-flex justify-content-center" >
    <input className='search w-50 m-3'placeholder="search ..."
    onChange={(e) => setsearchTitle(e.target.value)}
    ></input>
    </div>

    
    
    {(movies.length !== 0) ? <div className="container mb-3">
    <div className="row g-3 d-flex align-items-center justify-content-center">
    <div className="col-md-4">
      <div className="brdr w-25 my-3"></div>
        <h2 className='h3'>Beef</h2>
        
      <div className="brdr w-75 mt-3"></div>
      </div>
      {movies.recipes?.filter((value) => {
                        if (searchTitle == "") {
                            console.log(value);
                            return value
                        } else if (value.title
                            .toLowerCase().includes(searchTitle.toLowerCase())) {
                            return value
                        }
                    }).slice(0,10).map((item,index)=><HomeItems key={index} item={item}/>)}
      {/* {movies?.map((item)=><HomeItems key></HomeItems>)} */}
    </div>

    <div className="row py-3 g-3 d-flex align-items-center justify-content-center">
      <div className="col-md-4">
      <div className="brdr w-25 my-3"></div>
        <h2 className='h3'>Salad</h2>
        
      <div className="brdr w-75 mt-3"></div>
      </div>
      {series.recipes?.filter((value) => {
                        if (searchTitle == "") {
                            console.log(value);
                            return value
                        } else if (value.title
                            .toLowerCase().includes(searchTitle.toLowerCase())) {
                            return value
                        }
                    }).slice(0,10).map((item,index)=><HomeItems key={index} item={item}/>)}
    </div>

    <div className="row py-3 g-3 d-flex align-items-center justify-content-center">
    <div className="col-md-4">
      <div className="brdr w-25 my-3"></div>
        <h2 className='h3'>Pizza</h2>
        
      <div className="brdr w-75 mt-3"></div>
      </div>
      {people.recipes?.filter((value) => {
                        if (searchTitle == "") {
                            console.log(value,"search");
                            return value
                        } else if (value.title
                            .toLowerCase().includes(searchTitle.toLowerCase())) {
                            return value
                        }
                    }).slice(0,10).map((item,index)=><HomeItems key={index} item={item}/>)}
    </div>

  </div> : <LoadingScreen/>}
    </HelmetProvider>
    </>)
}
