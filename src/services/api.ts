import axios from "axios"

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const baseURL = process.env.NEXT_PUBLIC_API_URL!

export const API = axios.create({ baseURL })
