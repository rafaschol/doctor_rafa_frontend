import { useState, createContext } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import * as diagnosticsApi from "../api/diagnostics"

export const PrivateContext = createContext()

const PrivateProvider = ({ children }) => {
  const { addDiagnosis } = useAuth()

  const [getSymptomsStatus, setGetSymptomsStatus] = useState({
    data: null,
    error: null,
    loading: false
  })
  const [diagnoseStatus, setDiagnoseStatus] = useState({
    data: null,
    error: null,
    loading: false
  })
  const [confirmDiagnosisStatus, setConfirmDiagnosisStatus] = useState({
    success: false,
    error: null,
    loading: false
  })

  const navigate = useNavigate()

  const getSymptoms = async search => {
    const authToken = localStorage.getItem("authToken")

    if (authToken) {
      setGetSymptomsStatus(prev => ({ ...prev, error: false, loading: true }))

      try {
        const data = await diagnosticsApi.getSymptoms(search, authToken)
        setGetSymptomsStatus({ data, error: false, loading: false })
      } catch (error) {
        setGetSymptomsStatus({
          data: null,
          error: ["Unexpected error occurred. Try again later."],
          loading: false
        })
      }
    } else {
      navigate("/login")
    }
  }

  const resetSymptoms = () =>
    setGetSymptomsStatus({ data: null, error: null, loading: false })

  const diagnose = async symptoms => {
    const authToken = localStorage.getItem("authToken")

    if (authToken) {
      setDiagnoseStatus({ data: null, error: null, loading: true })

      try {
        const data = await diagnosticsApi.diagnose(symptoms, authToken)
        setDiagnoseStatus({ data, error: null, loading: false })
      } catch (error) {
        setDiagnoseStatus({
          data: null,
          error: ["Unexpected error occurred. Try again later."],
          loading: false
        })
      }
    } else {
      navigate("/login")
    }
  }

  const resetDiagnostic = () =>
    setDiagnoseStatus({
      data: null,
      error: null,
      loading: false
    })

  const confirmDiagnosis = async diagnosis => {
    const authToken = localStorage.getItem("authToken")

    if (authToken) {
      setConfirmDiagnosisStatus({ success: false, error: null, loading: true })

      try {
        const data = await diagnosticsApi.confirmDiagnosis(diagnosis, authToken)

        // Update state
        addDiagnosis(data)

        setDiagnoseStatus({ success: true, error: null, loading: false })
      } catch (error) {
        setDiagnoseStatus({
          success: null,
          error: ["Unexpected error occurred. Try again later."],
          loading: false
        })
      }
    } else {
      navigate("/login")
    }
  }

  return (
    <PrivateContext.Provider
      value={{
        getSymptoms,
        resetSymptoms,
        diagnose,
        resetDiagnostic,
        confirmDiagnosis,
        getSymptomsStatus,
        diagnoseStatus,
        confirmDiagnosisStatus
      }}
    >
      {children}
    </PrivateContext.Provider>
  )
}

export default PrivateProvider
