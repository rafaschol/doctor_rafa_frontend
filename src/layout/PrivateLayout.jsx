import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Navbar from "../components/Navbar"

const PrivateLayout = () => {
  const { auth } = useAuth()

  if (!auth.data) return <Navigate to="/login" />

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <Navbar
        links={[
          { id: 1, to: "/", name: "Diagnose" },
          { id: 2, to: "/diagnostic-history", name: "Diagnostics history" }
        ]}
      />
      <div className="p-4 lg:px-80 md:py-8 relative grow">
        <Outlet />
      </div>
    </div>
  )
}

export default PrivateLayout
