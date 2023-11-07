/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/User/Signup";
import UserDash from "./components/User/UserDash";
import UserForm from "./components/User/userForm";
import { useSelector } from "react-redux";
import AdminDash from "./components/Admin/AdminDash/AdminDash";

import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState<string | null>(null);
const token = useSelector((state : any) => state.user.token ); 
const admin  = useSelector((state:any)=>state.adminEmail)
useEffect(()=>{
const fetchData = () =>{
  const userd: string | null  = token
  const admind: string | null  = admin
  setUser(userd ? userd : admind)
}
fetchData()
},[token, admin])
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      {user &&<Route path="/adminhome" element={<AdminDash/>}></Route>}
      {user &&<Route path="/userhome" element={ <UserDash/>}></Route>}
      {user &&<Route path="/userform" element={ <UserForm/>}></Route>}
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
