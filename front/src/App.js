import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Register from "./pages/Register"
import Login from "./pages/Login"
import Navbar from './components/Navbar';
import AddCar from './pages/AddCars';
import CarList from './pages/AllCars';
import EditCar from './pages/EditPage'
import MyCars from './pages/MyCars';
import CarView from './pages/ViewCar'

function App() {
  const jwt = localStorage.getItem("token");
  const location = useLocation();

  const showNavbar = location.pathname !== '/signin' && location.pathname !== '/signup';

  return (
    <>
      {showNavbar && <Navbar jwt={jwt} />}
      <Routes>
        
        <Route path='/myCars' element={<MyCars />} />
        <Route path='/' element={<CarList />} />
        
        <Route path='/addCars' element={<AddCar />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/cars/edit/:id' element={<EditCar />} />
        <Route path='/cars/view/:id' element={<CarView />} /> 
      </Routes>
    </>
  );
}

export default App;
