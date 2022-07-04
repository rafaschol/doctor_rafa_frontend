import { useState, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom"
import * as authApi from "../api/auth"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ data: null, error: null, loading: false })
  const [registerStatus, setRegisterStatus] = useState({
    success: false,
    error: null,
    loading: false
  })
  const [initialLoading, setInitialLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const authToken = localStorage.getItem("authToken")

      if (authToken) {
        try {
          const data = await authApi.getCurrentUser(authToken)
          setAuth({ data, error: null, loading: false })
        } catch (error) {
          setAuth(() => ({ loading: false }))
        }
      }

      setInitialLoading(false)
    })()
  }, [])

  const login = async values => {
    setAuth(prevAuth => ({ ...prevAuth, loading: true }))

    try {
      const data = await authApi.login(values)
      localStorage.setItem("authToken", data.token)
      setAuth({ data, error: null, loading: false })
      navigate("/")
    } catch (error) {
      setAuth(prev => ({
        ...prev,
        error:
          error?.status === 400
            ? ["Invalid credentials."]
            : ["Unexpected error occurred. Try again later."],
        loading: false
      }))
    }
  }

  const logout = () => {
    setAuth({ data: null, error: null, loading: false })
    localStorage.setItem("authToken", "")
  }

  const register = async values => {
    setRegisterStatus({ success: false, error: null, loading: true })

    try {
      const data = await authApi.register(values)
      localStorage.setItem("authToken", data.token)

      setRegisterStatus({ success: true, error: null, loading: false })
      setAuth({ data, error: null, loading: false })
      navigate("/")
    } catch (error) {
      setRegisterStatus({
        success: false,
        error:
          error?.status === 400
            ? Object.values(error.data).reduce(
                (prev, current) => prev.concat(current),
                []
              )
            : ["Unexpected error occurred. Try again later."],
        loading: false
      })
    }
  }

  const addDiagnosis = diagnosis => {
    setAuth(prev => ({
      ...prev,
      data: {
        ...prev.data,
        diagnostics: [...prev.data.diagnostics, diagnosis]
      }
    }))
  }

  if (initialLoading) return <p>Loading...</p>

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, register, addDiagnosis, registerStatus }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
