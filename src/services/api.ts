import axios from "axios"

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const baseURL = ""

export const API = axios.create({ baseURL })
