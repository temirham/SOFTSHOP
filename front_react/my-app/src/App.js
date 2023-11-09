import './App.css';
import {BrowserRouter,  Route, Routes} from "react-router-dom";
import Catalog from "./components/Catalog";
import Main from "./components/Main";
import Product from "./components/Product";
import Drawer from "./components/Drawer";
import Register from "./components/Register";
import Login from "./components/Login";
import ManagerPage from "./components/ManagerPage";
import MyPayment from "./components/MyPayment";
import NewSoft from "./components/NewSoft";
import UpdateSoft from "./components/UpdateSoft";


function App() {
  return (
      <div className="App">
          <BrowserRouter basename="/">
              <Routes>
                  <Route exact path="/catalog" element={<Catalog/>}/>
                  <Route exact path="/" element={<Main/>}/>
                  <Route exact path="/product/:id" element={<Product/>}/>
                  <Route exact path="/drawer" element={<Drawer/>}/>
                  <Route exact path="/register" element={<Register/>}/>
                  <Route exact path='/login' element={<Login/>}/>
                  <Route exact path='/manage' element={<ManagerPage/>}/>
                  <Route exact path='/mypayment' element={<MyPayment/>}/>
                  <Route exact path='/newsoft' element={<NewSoft/>}/>
                  <Route exact path='/updatesoft/:id' element={<UpdateSoft/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;