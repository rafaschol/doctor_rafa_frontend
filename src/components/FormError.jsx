const FormError = ({ errors }) => {
  return (
    <div className="bg-red-300 border-red-500 border-2 text-white p-4 grid g-4 mt-4">
      {errors.map((error, i) => (
        <p key={i}>{error}</p>
      ))}
    </div>
  )
}

export default FormError
