

export default function Login() {
  return (
    <div>
      <div className="flex flex-col justify-center mt-24 ">
        <h1 className="mb-10 ">Login Form</h1>
        <form action="" className="flex flex-col justify-center align-middle">
          <input type="email"  placeholder="Enter your Email" className="mt-5"/>
          <input type="password" placeholder="Enter your password" className="mt-5 mb-10" />
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}
