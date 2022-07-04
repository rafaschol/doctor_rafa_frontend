import { useRef } from "react"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import FormError from "../components/FormError"

const Register = () => {
  const { register, registerStatus } = useAuth()

  const passwordConfirmRef = useRef()

  const handleRegister = e => {
    e.preventDefault()

    const data = new FormData(e.target)
    const values = Object.fromEntries(data.entries())

    // Validate password confirm
    const passwordConfirmInput = passwordConfirmRef.current
    if (values.password !== values.passwordConfirm) {
      passwordConfirmInput.setCustomValidity("Passwords mismatch")
      e.target.reportValidity()
      return
    }
    passwordConfirmInput.setCustomValidity("")

    register(values)
  }

  return (
    <div className="bg-slate-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 shadow-md w-full m-4 md:w-[32rem] md:mx-0">
        <h2 className="text-center text-4xl font-bold mb-8">Register</h2>
        <form onSubmit={handleRegister} className="grid gap-6">
          <div className="grid gap-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              required
              className="border p-2"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              name="first_name"
              id="firstName"
              required
              className="border p-2"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              name="last_name"
              id="lastName"
              required
              className="border p-2"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="birthDate">Date of birth</label>
            <input
              type="date"
              name="birth_date"
              id="birthDate"
              required
              className="border p-2"
            />
          </div>
          <div className="grid gap-2">
            <p>Gender</p>
            <div className="w-1/2 flex gap-2 items-center">
              <input
                type="radio"
                name="gender"
                id="male"
                value="M"
                defaultChecked
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="w-1/2 flex gap-2 items-center">
              <input type="radio" name="gender" id="female" value="F" />
              <label htmlFor="female">Female</label>
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              min="8"
              className="border p-2"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="passwordConfirm">Confirm password</label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              required
              ref={passwordConfirmRef}
              onInput={e => e.target.setCustomValidity("")}
              className="border p-2"
            />
          </div>
          <input
            type="submit"
            value="Sign up"
            className="bg-sky-500 text-white p-2"
          />
        </form>

        {registerStatus.error && <FormError errors={registerStatus.error} />}

        <p className="mt-4 text-blue-900 text-center">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
