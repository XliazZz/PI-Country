import './App.css';
import Nav from './Components/Nav/Nav';
import Landing from './Components/Landing/Landing';
import Searches from './Components/Searches/Searches';
import Home from './Components/Home/Home';
import DetailCountry from './Components/DetailCountry/DetailCountry';
import FormActivity from './Components/FormActivity/FormActivity';
import FavoriteCountry from './Components/FavoriteCountry/FavoriteCountry';
import Register from './Components/Register/Register';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

function App() {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/searches' element={<Searches/>}/>
        <Route path='/detail/:id' element={<DetailCountry />}/>
        <Route path='/activity' element={<FormActivity />}/>
        <Route path='/favorites/country' element={<FavoriteCountry />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </div>
  );
}

export default App;
