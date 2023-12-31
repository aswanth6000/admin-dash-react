import axios from '../../axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../redux/userSlice';
import { adminLogin } from '../../redux/adminSlice';
import { setAdminUsers } from '../../redux/adminSlice';

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const [value, setValue] = useState<FormValues>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch()
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response = await axios.post('/login',value, {
        headers : {
          'Content-Type' : 'application/json',
        },
      })

     
      
      if (response.status === 200) {
      dispatch(setLogin({
        user: response.data.data.user,
        token: response.data.data.token,
      }))
        console.log('Login successful');
        navigate('/userhome')
        window.location.reload();
      } else if(response.status === 201) {
        console.log('log:',response.data);
        dispatch(adminLogin({
          adminEmail: response.data.data.adminEmail,
        }));
        dispatch(setAdminUsers({
          users : response.data.data.users
        }))
        console.log('Admin login successful');
        navigate('/adminhome')
      }else{
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
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
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
                    value={value.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
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
                    value={value.password}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <p className='block mb-2 text-sm font-medium text-red-600 dark:text-red-600 text-center' >{error? error : ''}</p>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account yet?{' '}
                  <a href="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
