import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/User/Signup";
import UserDash from "./components/User/UserDash";
import UserForm from "./components/User/userForm";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState<string | null>(null);
useEffect(()=>{
const fetchData = () =>{
  const userd: string | null  = localStorage.getItem('token')
  setUser(userd)
}
fetchData()
},[user])

const userd = useSelector((state) => state.user); // Assuming 'user' is the name of your reducer
  console.log('User data from Redux store:', userd);
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      {user &&<Route path="/userhome" element={ <UserDash/>}></Route>}
      {user &&<Route path="/userform" element={ <UserForm/>}></Route>}
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
