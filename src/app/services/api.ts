import axios from "axios";

const url = process.env.BASEURL ?? 'http://localhost:3000'

const api = axios.create({ baseURL:  url+'/api' })


export {api, url};