import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/NotFound/Notfound';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import Series from './Components/Series/Series';

export default function App() {
  
  function ProtectedRoute({children}){

    if(userData === null && localStorage.getItem('tkn') === null){
      return <Navigate to={'/login'}/>
    }else{
      return <> 
      { children }
      </>
    }
  };

  const [userData, setUserData] = useState(null);
  
  function saveUserData(){
    const encodedToken = localStorage.getItem('tkn');
    const decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
    console.log(userData);
  }

  function clearUserData(){
    localStorage.removeItem('tkn');
    setUserData(null);
  }

    useEffect(function(){
    if ( localStorage.getItem('tkn') !== null && userData === null ){
      saveUserData();
    }
  },[]);

  const routers = createBrowserRouter([
    { path: "", element: <Layout userData={userData} clearUserData={clearUserData}/> , children: [
      {index:true , element:<ProtectedRoute> <Home/> </ProtectedRoute>},
      {path:"home" , element: <ProtectedRoute> <Home/> </ProtectedRoute>},
      {path:"movies" , element:<ProtectedRoute> <Movies/></ProtectedRoute>},
      {path:"series" , element:<ProtectedRoute> <Series/></ProtectedRoute>} ,
      {path:"people" , element: <ProtectedRoute><People/></ProtectedRoute>},
      {path:"moviedetails/:id/:mediaType" , element: <ProtectedRoute><MovieDetails/></ProtectedRoute>},
      {path:"login" , element: <Login saveUserData={saveUserData} />},
      {path:"Popcornflix" , element: <Login saveUserData={saveUserData} />},
      {path:"register" , element: <Register/>},
      {path:"*" , element: <Notfound/>},
    ]}
  ])

  return <>
  <Toaster/>
  <RouterProvider router={routers}/>
  </>
}

