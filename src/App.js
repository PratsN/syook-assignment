import './App.css';
import Landing from './Components/Landing';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Components/Login';
import Products from "./Components/Products";
import Dishes from './Components/Dishes';



function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="products" element={<Products/>}></Route>
        <Route path="dishes" element={<Dishes/>}></Route>
      
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
