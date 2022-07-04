import { Routes, Route } from "react-router-dom"
import AuthProvider from "./context/AuthContext"
import PrivateProvider from "./context/PrivateContext"
import PrivateLayout from "./layout/PrivateLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Diagnose from "./pages/Diagnose"
import DiagnosticHistory from "./pages/DiagnosticHistory"

const App = () => {
  return (
    <AuthProvider>
      <PrivateProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<PrivateLayout />}>
            <Route index element={<Diagnose />} />
            <Route path="diagnostic-history" element={<DiagnosticHistory />} />
          </Route>
        </Routes>
      </PrivateProvider>
    </AuthProvider>
  )
}

export default App
