import axios from '../../../axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface FormValues {
  fullname : string;
  email: string;
  password: string;
  confirmpassword: string


}

export default function Signup() {
  const [value, setValue] = useState<FormValues>({
    fullname:'',
    email: '',
    password: '',
    confirmpassword : '',

  });

  const nvaigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  
const [error, setError] = useState<string>('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if(value.confirmpassword !== value.password){
      setError("Passwords dosen't match ")
      return
    }else{
      setError('')
    }
    try{
      const response = await axios.post("/signup", value, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.status === 200) {
        nvaigate("/")
        console.log('Login successful');
      } else {
         console.log('Login failed');
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error:any){
      if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create new account
              </h1>
              <form className="space-y-4 md:space-y-6" autoComplete="off" onSubmit={handleSignup}>
                <div>
                  <label
                    htmlFor="fullname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    onChange={handleChange}
                    value={value.fullname}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none "
                    placeholder="Full name"
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
                    onChange={handleChange}
                    value={value.email}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none "
                    placeholder="name@company.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={value.password}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmpassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                   Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmpassword"
                    onChange={handleChange}
                    value={value.confirmpassword}
                    id="confirmpassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <p className='block mb-2 text-sm font-medium text-red-600 dark:text-red-600 text-center' >{error? error : ''}</p>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account ?{' '}
                  <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Sign In
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
