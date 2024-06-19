import axios from "axios";

const url = process.env.BASEURL ?? 'http://localhost:3000/api'

const api = axios.create({ baseURL:  url})


export {api, url};