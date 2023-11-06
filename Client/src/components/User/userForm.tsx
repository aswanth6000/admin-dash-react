import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import profile from '/default-pic.jpg'

interface UserData {
    fullname: string;
    email : string;
    createdAt : string
}

export default function UserForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pic, setPic] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: UserData | null = useSelector((state: any) => state.user.user);
    useEffect(()=>{
     if(user){
        setName(user.fullname) ;
        setEmail(user.email)
     } 
    }, [user]);
    const handleFileChange = (event : React.ChangeEvent<HTMLInputElement>) =>{
        const file = event.target.files?.[0];
        if(file){
            setPic(URL.createObjectURL(file))
        }
    }

  return (
    <div>
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Edit user details
              </h1>
              <form className="space-y-4 md:space-y-6" >
              <div className="mt-6 w-fit mx-auto">
                <img src={pic ? pic : profile} className="rounded-full w-28 " alt="profile picture" />
            </div>
                <div>
                  <label
                    htmlFor="fullname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={name ? name : ''}
                    
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email ? email : ''}
                    
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                <input className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept="image/*" onChange={handleFileChange}/>
                </div>

                <p className='block mb-2 text-sm font-medium text-red-600 dark:text-red-600 text-center' >hhhhh</p>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
