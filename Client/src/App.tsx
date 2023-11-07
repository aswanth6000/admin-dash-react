/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/User/Signup";
import UserDash from "./components/User/UserDash";
import UserForm from "./components/User/userForm";
import { useSelector } from "react-redux";
import AdminDash from "./components/Admin/AdminDash";
import AdminuserForm from "./components/Admin/adminuserForm";

import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState<string | null>(null);
  const [admin, setAdmin] = useState<string | null>(null);
const token = useSelector((state : any) => state.user.token ); 
const adminEmail  = useSelector((state:any)=>state.admin.adminEmail)
useEffect(()=>{
const fetchData = () =>{
  const userd: string | null  = token
  const admind: string | null  = adminEmail
  setUser(userd);
  setAdmin(admind)
}
fetchData()
},[token, adminEmail])
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      {admin &&<Route path="/adminhome" element={<AdminDash/>}></Route>}
      {admin &&<Route path="/adminedit/:userId" element={<AdminuserForm/>}></Route>}
      {user &&<Route path="/userhome" element={ <UserDash/>}></Route>}
      {user &&<Route path="/userform" element={ <UserForm/>}></Route>}
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
