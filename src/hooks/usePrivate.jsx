import { useContext } from "react"
import { PrivateContext } from "../context/PrivateContext"

const usePrivate = () => useContext(PrivateContext)

export default usePrivate
