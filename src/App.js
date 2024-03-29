import React from 'react';
import {Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Upload from './pages/Upload';
import Register from './pages/Register';
import Login from './pages/Login';
import  {Videos} from './pages/Videos';
import {Facerecog}  from './pages/Facerecog';
import Uservideos from './pages/Uservideos';
import './css/App.css';

const App = () => {
  return (
   <div>
      <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/upload' element={<Upload/>}/>
            <Route path='/reg' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="/stream/:param" element={<Videos/>}/>
            <Route path='/verify' element={<Facerecog/>}/>
            <Route path='/userVideos' element={<Uservideos/>}/>
            <Route path='/search/:query' element={<Search/>}/>
      </Routes>
   </div> 
  )
}

export default App