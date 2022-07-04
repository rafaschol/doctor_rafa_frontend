const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const get = async (url, authToken) => {
  const response = await fetch(`${BACKEND_URL}${url}`, {
    method: "GET",
    ...(authToken && { headers: { Authorization: `Token ${authToken}` } })
  })

  return await handleResponse(response)
}

const post = async (url, body, authToken) => {
  const response = await fetch(`${BACKEND_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Token ${authToken}` })
    },
    body: JSON.stringify(body)
  })

  return await handleResponse(response)
}

const handleResponse = async response => {
  const data = await response.json()

  if (!response.ok) {
    return Promise.reject({ status: response.status, data })
  }

  return data
}

const client = { get, post }

export default client
