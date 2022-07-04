import { useEffect } from "react"
import { FaTimes as CloseIcon } from "react-icons/fa"

const Toast = ({ type, message, close }) => {
  useEffect(() => {
    setTimeout(close, 5000)
  }, [])

  return (
    <div
      className={`absolute top-0 right-0 ${
        type === "success" ? "bg-green-400" : "bg-red-400"
      } p-4 mt-4 mr-4 rounded text-white flex items-center gap-4`}
    >
      {message}
      <CloseIcon className="cursor-pointer" onClick={close} />
    </div>
  )
}

export default Toast
