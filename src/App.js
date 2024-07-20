
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min.js'
import './App.css';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Notfound from './Components/Notfound/Notfound';
import ProductedRoute from './Components/ProductedRoute/ProductedRoute';

function App() {
 let router= createBrowserRouter([{
  path:'',element:<Layout/>,children:[{
    path:"home",element:<ProductedRoute><Home/></ProductedRoute>  },
  {path:'login',element:<Login/> },
  {path:"register",element:<Register/> },
  {path:'*',element:<Notfound/> }
  ]
 }])
  return (
  <div>
   <RouterProvider router={router} />
  </div>
  );
}

export default App;
