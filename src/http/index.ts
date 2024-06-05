import axios from 'axios'
import { setupInterceptorsTo } from './interceptors'

const http = axios.create({
    baseURL: `${import.meta.env.BASE_URL}`,
    params: {},
})

setupInterceptorsTo(http)

export default http
