import client from "./client"

export const getSymptoms = (search, authToken) =>
  client.get(`/medical/symptoms?search=${search}`, authToken)

export const diagnose = (symptoms, authToken) => {
  const symptomsArray = symptoms.map(symptom => symptom.id)
  const url = `/medical/diagnose?symptoms=[${symptomsArray.toString()}]`
  return client.get(url, authToken)
}

export const confirmDiagnosis = (body, authToken) =>
  client.post("/medical/confirm-diagnosis", body, authToken)
