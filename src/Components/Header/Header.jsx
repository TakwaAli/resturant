
import React from 'react'
import beef from '../../images/beef.jpg'
import pizaa from '../../images/pizza.jpg'
import salad from '../../images/salad.jpg'
export default function Footer() {
  return (
    <>
   
<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img  className="d-block w-100 header-img" src={beef} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={salad} className="d-block w-100 header-img" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={pizaa} className="d-block w-100 header-img" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </>
    )
}
