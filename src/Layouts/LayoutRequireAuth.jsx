import { useContext } from "react";
import {UserContext} from "../context/UserProvider"
import{Navigate, Outlet} from 'react-router-dom'

const LayoutRequireAuth = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  return(
      <div className="container mx-auto">
          <Outlet/> 
      </div>
  );
};

export default  LayoutRequireAuth 