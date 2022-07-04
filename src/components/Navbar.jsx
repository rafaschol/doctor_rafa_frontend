import { NavLink } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Navbar = ({ links }) => {
  const { auth, logout } = useAuth()

  return (
    <nav className="bg-white p-4 gap-4 flex items-center md:px-16 md:py-6 md:gap-10 shadow">
      {links.map(link => (
        <NavLink
          key={link.id}
          to={link.to}
          className={({ isActive }) =>
            `text-xl md:text-2xl${isActive ? " text-sky-500" : ""}`
          }
        >
          {link.name}
        </NavLink>
      ))}
      <p className="hidden ml-auto text-2xl font-medium md:block uppercase">
        {`${auth.data.first_name} ${auth.data.last_name}`}
      </p>
      <button
        onClick={logout}
        className="bg-sky-500 text-white py-2 px-4 rounded ml-auto md:ml-0"
      >
        Logout
      </button>
    </nav>
  )
}

export default Navbar
