import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/userSlice";
import profile from '/default-pic.jpg'

interface UserData {
      fullname: string;
      email : string;
      createdAt : string
}

export default function UserDash() {

const dispatch = useDispatch()
const navigate = useNavigate()

const handleLogout = () =>{
  dispatch(setLogout())
  navigate('/')
}
const [name, setName] = useState<string>('')
const [email, setEmail] = useState<string>('')
const [date, setDate] = useState<string>('');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userData: UserData| null = useSelector((state : any) => state.user.user ); 

useEffect(()=>{
      if (userData) {
      setName(userData.fullname);
      setEmail(userData.email)
      const createdAtDate = new Date(userData.createdAt);
    setDate(createdAtDate.toDateString());
    } else {
      setName('');
    }
}, [userData])
  
  return (
    <div>
      <section className=" bg-[#071e34] flex font-medium items-center justify-center h-screen">

<section className="w-auto mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
    <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">Joined : {date}</span>
        <span className="text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </span>
    </div>
    <div className="mt-6 w-fit mx-auto">
        <img src={profile} className="rounded-full w-28 " alt="profile picture" />
    </div>

    <div className="mt-8 ">
        <h2 className="text-white font-bold text-2xl tracking-wide whitespace-nowrap pr-4">{name}</h2>
    </div>
    <p className="text-emerald-400 font-semibold mt-2.5" >
        {email}
    </p>

    <div className="mt-3 text-white text-sm">
   <Link to="/userform"> <button
      className="w-full  text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
    Edit profile
    </button></Link>
    <button
    onClick={handleLogout}
      className="w-full mt-3 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
    >
    Logout
    </button>
    </div>

</section>


</section>
    </div>
  )
}
