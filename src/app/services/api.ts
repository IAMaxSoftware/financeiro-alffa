import axios from "axios";

const url = process.env.BASEURL ?? 'http://localhost:3000'

const api = axios.create({ baseURL:  'https://financeiro-financeiro-next.uo41yf.easypanel.host/api' })


export {api, url};