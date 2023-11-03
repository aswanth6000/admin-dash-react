import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/User/Signup/Signup";
import UserDash from "./components/User/UserDash/UserDash";
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/userhome" element={<UserDash/>}></Route>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App