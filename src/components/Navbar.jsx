import { useContext } from "react"
import{Link,NavLink} from "react-router-dom"
import { UserContext } from "../context/UserProvider"

const Navbar = () => {

    const {user,setUser,signOutUser} = useContext(UserContext)

    const handleClickLogout = async() => {

        try {

            await signOutUser()


            
        } catch (error) {

            console.log(error.code)
            
        }



    }

    const classButtonBlue = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    const  classButtonRed="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-nonefocus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600dark:hover:bg-red-700 dark:focus:ring-blue-800"
    return(
        <nav className="bg whithe border gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">URLSHORTAPP</span>
            </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {
                        user ?  ( <><NavLink to="/" className={classButtonBlue}>Inicio</NavLink>

                                    <button onClick={handleClickLogout} className={classButtonRed}>Logout</button></> ) : 
                                    
                                ( <> <NavLink to="/login" className={classButtonBlue}>Login</NavLink> 
                                   
                                    <NavLink to="/register" className={classButtonBlue}>Register</NavLink></>)
                        }
                </div>
            </div>
        </nav>
    )

}

export default Navbar