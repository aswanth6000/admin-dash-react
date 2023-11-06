import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserData {
  data: {
    user: {
      fullname: string;
      email : string;
    };
  };
}

export default function UserDash() {

  
const navigate = useNavigate()

const handleLogout = () =>{
  localStorage.removeItem('token');
  navigate('/')
}
const [name, setName] = useState<string>('')
useEffect(()=>{
  const t: string | null = localStorage.getItem('token')
      if (t) {
      const parsedData: UserData = JSON.parse(t);
      console.log('jjjjjjjjjjj', parsedData.data.user.fullname);
      setName(parsedData.data.user.fullname);
    } else {
      setName('');
    }
}, [])
  
  return (
    <div>
      <section className=" bg-[#071e34] flex font-medium items-center justify-center h-screen">

<section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
    <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">2d ago</span>
        <span className="text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </span>
    </div>
    <div className="mt-6 w-fit mx-auto">
        <img src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe" className="rounded-full w-28 " alt="profile picture" />
    </div>

    <div className="mt-8 ">
        <h2 className="text-white font-bold text-2xl tracking-wide">{name}</h2>
    </div>
    <p className="text-emerald-400 font-semibold mt-2.5" >
        Active
    </p>

    <div className="h-1 w-full bg-black mt-8 rounded-full">
        <div className="h-1 rounded-full w-2/5 bg-yellow-500 "></div>
    </div>
    <div className="mt-3 text-white text-sm">
    <button
    onClick={handleLogout}
      className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
    >
    Logout
    </button>
    </div>

</section>


</section>
    </div>
  )
}
