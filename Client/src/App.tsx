import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/User/Signup/Signup";
import UserDash from "./components/User/UserDash/UserDash";
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
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      {user &&<Route path="/userhome" element={ <UserDash/>}></Route>}
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
