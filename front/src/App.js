import {createBrowserRouter, RouterProvider} from 'react-router-dom'


import FirstPage from './components/FirstPage';
import News from './components/News/News';
import Contacts from './components/Contacts/Contacts';
import AboutCompany from './components/AboutCompany/AboutCompany';
import CatalogCamera from './components/Catalogs/CatalogCamera';
import Root from './Root'
import Admin from './components/Admin/Admin'
import AdminLogin from './components/Admin/AdminLogin'
import AdminAdd from './components/Admin/AdminAdd'
import AdminCart from './components/Admin/AdminCart'
import CatalogLinse from './components/Catalogs/CatalogLinse';
import ProductPage from './components/Catalogs/ProductPage'
import OrderCart from './components/Header/OrderCart'
import Comparison from './components/Header/Comparison'

import Confirmation from './components/Header/Confirmation';
import Login from './components/Header/Login/Login';
import Authorized from './components/Header/Login/Authorized';
import Registration from './components/Header/Login/Registration';
import Liked from './components/Header/Liked';


function App() {

  const router = createBrowserRouter([
    {path:'/', 
    element: <Root />, 
    children:[
      {path:'', element:<FirstPage />},
      {path:'/news', element:<News />},
      {path:'/contacts', element:<Contacts />},
      {path:'/about', element:<AboutCompany />},
      {path:'/login', element:<Login />},
      {path:'/login/registration', element:<Registration />},
      {path:'/login/authorized', element:<Authorized />},
      {path:'/comparison', element:<Comparison />},
      {path:'/liked', element:<Liked />},
      {path:'/orders', element:<OrderCart />},
      {path:'/ordersConfirmation', element:<Confirmation />},
      {path:'/admin', element:<Admin />},
      {path:'/adminLogin', element:<AdminLogin />},
      {path:'/admin/add', element:<AdminAdd/>},
      {path:'/admin/view/:id', element:<AdminCart/>},
      {path:'/cameras', element:<CatalogCamera />},
      {path:'/cameras/view/:id', element:<ProductPage/>},
      {path:'/linses/view/:id', element:<ProductPage/>},
      {path:'/linses', element:<CatalogLinse />},
      
    ]},
  ])

  return (
    <RouterProvider router={router}>
      
    </RouterProvider>
    // <Main></Main>
  );
}

export default App;
