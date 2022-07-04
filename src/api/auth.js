import client from "./client"

export const login = body => client.post("/auth/login", body)

export const register = body => client.post("/auth/register", body)

export const getCurrentUser = authToken => client.get("/auth/user", authToken)
