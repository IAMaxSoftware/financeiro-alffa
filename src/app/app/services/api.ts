import axios from "axios";

const url = process.env.NEXT_PUBLIC_APP_URL + '/api' ?? 'http://localhost:3000/api'

const api = axios.create({ baseURL: url })


export { api, url };