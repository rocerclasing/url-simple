import { useContext } from 'react'
import { UserContext } from './context/UserProvider'

import{Routes,Route} from 'react-router-dom'

import Login from "../src/routes/Login"
import Home from './routes/Home'
import Perfil from './routes/Perfil'
import Register from "../src/routes/Register"
import NotFound from './routes/NotFound'


import Navbar from './components/Navbar'

import LayoutContainerForm  from"./Layouts/LayoutContainerForm";
import LayoutRequireAuth from '../src/Layouts/LayoutRequireAuth'



const App =()=> {

  const {user} = useContext(UserContext)

  if(user===false)
  {
    return <p>Loading...</p>
  }
 
  return (
    <>     

  

     <Navbar/>
    <Routes>
          <Route path="/" element={ <LayoutRequireAuth/>}/>
          <Route index element={<Home/>}/>
          <Route path="perfil" element={<Perfil/>}/>
    </Routes>

    <Routes path="/" element={<LayoutContainerForm/>}>
    
      <Route path="/login" element={<Login/>}/>                                                                                                                              
      <Route path="/register" element={<Register/>}/>
      
   

    </Routes>



    
    </>
  )
}

export default App
