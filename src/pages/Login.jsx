import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Loading from "../components/Loading"
import FormError from "../components/FormError"

const Login = () => {
  const { login, auth } = useAuth()

  const handleLogin = e => {
    e.preventDefault()

    const data = new FormData(e.target)
    const values = Object.fromEntries(data.entries())

    login(values)
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (auth.data !== null) navigate("/")
  }, [])

  return (
    <div className="bg-slate-100 min-h-screen flex justify-center items-center relative">
      {auth.loading && <Loading />}

      <div className="bg-white p-8 shadow-md w-full m-4 md:w-[32rem] md:m-0">
        <h2 className="text-center text-4xl font-bold mb-8">Login</h2>
        <form onSubmit={handleLogin} className="grid gap-6">
          <div className="grid">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              required
              className="border p-2"
            />
          </div>
          <div className="grid">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="border p-2"
            />
          </div>
          <input
            type="submit"
            value="Sign in"
            className="bg-sky-500 text-white p-2"
          />
        </form>

        {auth.error && <FormError errors={auth.error} />}

        <p className="mt-4 text-blue-900 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
