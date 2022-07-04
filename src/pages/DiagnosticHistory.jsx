import useAuth from "../hooks/useAuth"

const DiagnosticHistory = () => {
  const {
    auth: {
      data: { diagnostics }
    }
  } = useAuth()

  return (
    <div className="grid gap-8">
      <h2 className="text-4xl text-center">Diagnostic history</h2>

      <div className="grid gap-4">
        {diagnostics.length ? (
          diagnostics.map(diagnostic => (
            <div key={diagnostic.id} className="bg-white shadow grid gap-2 p-8">
              <p className="text-2xl text-sky-500 mb-2">{diagnostic.issue}</p>
              <p className="text-xl">
                <strong className="font-bold">DATE:</strong> {diagnostic.date}
              </p>
              <p className="text-xl">
                <strong className="font-bold">SYMPTOMS:</strong>{" "}
                {diagnostic.symptoms.map(symptom => symptom.name).join(", ")}
              </p>
              <p className="text-xl">
                <strong className="font-bold">
                  ACCURACY:
                  <span
                    className={
                      diagnostic.accuracy >= 70
                        ? "text-green-400"
                        : diagnostic.accuracy >= 30
                        ? "text-yellow-400"
                        : "text-red-400"
                    }
                  >
                    {" "}
                    {diagnostic.accuracy.toFixed(2)}%
                  </span>
                </strong>
              </p>
            </div>
          ))
        ) : (
          <h4 className="text-2xl text-center">You have no diagnoses yet</h4>
        )}
      </div>
    </div>
  )
}

export default DiagnosticHistory
