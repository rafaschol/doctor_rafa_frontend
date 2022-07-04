import { useState, useEffect, useMemo } from "react"
import { FaTimes as CloseIcon } from "react-icons/fa"
import usePrivate from "../hooks/usePrivate"
import Toast from "../components/Toast"
import Loading from "../components/Loading"

const Diagnose = () => {
  const {
    getSymptoms,
    resetSymptoms,
    diagnose,
    resetDiagnostic,
    confirmDiagnosis,
    getSymptomsStatus,
    diagnoseStatus,
    confirmDiagnosisStatus
  } = usePrivate()

  const [showError, setShowError] = useState(false)

  const [selectedSymptoms, setSelectedSymptoms] = useState([])

  const handleAddSymptom = symptom => {
    if (
      !selectedSymptoms.some(
        selectedSymptom => selectedSymptom.id === symptom.id
      )
    ) {
      setSelectedSymptoms(prev => [...prev, symptom])
    }
  }

  const handleDeleteSymptom = symptomId => {
    const selectedSymptomsUpdated = selectedSymptoms.filter(
      selectedSymptom => selectedSymptom.id !== symptomId
    )
    setSelectedSymptoms(selectedSymptomsUpdated)
  }

  const handleDiagnose = () => diagnose(selectedSymptoms)

  const handleConfirmDiagnosis = diagnosis => confirmDiagnosis(diagnosis)

  useEffect(() => {
    if (diagnoseStatus.error || confirmDiagnosisStatus.error) {
      setShowError(true)
    }
  }, [diagnoseStatus.error, confirmDiagnosisStatus.error])

  return (
    <div className="flex flex-col gap-8">
      {showError && (
        <Toast
          type="error"
          message="Unexpected error occurred. Try again later."
          close={() => setShowError(false)}
        />
      )}

      {(diagnoseStatus.loading || confirmDiagnosis.loading) && <Loading />}

      <h2 className="text-4xl text-center">How are you feeling?</h2>
      <SymptomsInput
        searchSymptoms={getSymptoms}
        resetSymptoms={resetSymptoms}
        symptoms={getSymptomsStatus.data}
        addSymptom={handleAddSymptom}
      />
      {!!selectedSymptoms.length && (
        <>
          <SelectedSymptomsList
            selectedSymptoms={selectedSymptoms}
            deleteSymptom={handleDeleteSymptom}
          />
          <button
            onClick={handleDiagnose}
            className="bg-sky-500 text-white px-8 py-4 text-2xl cursor-pointer self-center"
          >
            Get a diagnosis
          </button>
        </>
      )}

      {diagnoseStatus.data != null &&
        (diagnoseStatus.data.length ? (
          <>
            <hr />
            <DiagnosticResults
              results={diagnoseStatus.data}
              confirmDiagnosis={handleConfirmDiagnosis}
              symptoms={selectedSymptoms}
              resetDiagnostic={resetDiagnostic}
            />
          </>
        ) : (
          <>
            <hr />
            <h4 className="text-2xl text-center mb-8">
              Sorry, We couldn&apos;t identify your problem {":("}
            </h4>
          </>
        ))}
    </div>
  )
}

const SymptomsInput = ({
  searchSymptoms,
  resetSymptoms,
  symptoms,
  addSymptom
}) => {
  const [search, setSearch] = useState("")

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Start typing a symptom..."
        value={search}
        onChange={e => {
          setSearch(e.target.value)

          if (e.target.value.length >= 3) {
            searchSymptoms(e.target.value)
          } else {
            resetSymptoms()
          }
        }}
        className="w-full p-4 border rounded text-2xl"
      />
      {!!symptoms?.length && (
        <div className="absolute top-full z-10 border-x w-full">
          {symptoms.map(symptom => (
            <div
              key={symptom.id}
              className="border-b bg-white p-4 text-2xl text-gray-400 cursor-pointer"
              onClick={() => {
                addSymptom(symptom)
                resetSymptoms()
                setSearch("")
              }}
            >
              {symptom.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const SelectedSymptomsList = ({ selectedSymptoms, deleteSymptom }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {selectedSymptoms.map(symptom => (
        <Tag
          key={symptom.id}
          label={symptom.name}
          close={() => deleteSymptom(symptom.id)}
        />
      ))}
    </div>
  )
}

const Tag = ({ label, close }) => {
  return (
    <div className="bg-sky-400 rounded p-4 text-white inline-flex items-center gap-4">
      <span className="text-2xl">{label}</span>
      <CloseIcon size="1.5rem" className="cursor-pointer" onClick={close} />
    </div>
  )
}

const DiagnosticResults = ({
  results,
  resetDiagnostic,
  symptoms,
  confirmDiagnosis
}) => {
  const memoizedSymptoms = useMemo(
    () => symptoms.map(symptom => symptom.id),
    []
  )

  return (
    <div>
      <h4 className="text-4xl text-center mb-8">Results of the diagnostic</h4>

      <div className="grid gap-4">
        {results.map(result => (
          <div
            key={result.id}
            className="flex bg-white shadow gap-4 p-4 md:p-0"
          >
            <p className="border-r text-6xl w-32 h-32 hidden md:flex md:justify-center md:items-center">
              {result.ranking}
            </p>
            <div className="flex flex-col justify-evenly grow pr-8">
              <p className="text-2xl text-sky-500">{result.name}</p>
              <Progress value={result.accuracy} />
            </div>
            <button
              onClick={() => {
                resetDiagnostic()
                confirmDiagnosis({
                  issue: result.name,
                  accuracy: result.accuracy,
                  symptoms: memoizedSymptoms
                })
              }}
              className="md:mx-4 rounded self-center bg-sky-500 text-white p-4 text-lg cursor-pointer"
            >
              Confirm
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const Progress = ({ value }) => {
  const displayValue = Math.round(value)

  return (
    <div className="flex gap-4 items-center">
      <div className="w-full bg-gray-200 h-8 rounded-md overflow-hidden">
        <div
          className={`h-full ${
            value >= 70
              ? "bg-green-400"
              : value >= 30
              ? "bg-yellow-400"
              : "bg-red-400"
          }`}
          style={{ width: `${displayValue}%` }}
        ></div>
      </div>
      <p
        className={`text-2xl font-bold ${
          value >= 70
            ? "text-green-400"
            : value >= 30
            ? "text-yellow-400"
            : "text-red-400"
        }`}
      >
        {value.toFixed(2)}%
      </p>
    </div>
  )
}

export default Diagnose
