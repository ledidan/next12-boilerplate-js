import axios from 'axios'
const isLocal = () => {
  const { NODE_ENV } = process.env
  console.log('NODE_ENV', NODE_ENV)
  return NODE_ENV === 'development'
}
// TODO:
const DEV_BASE_URL = process.env.NEXT_PUBLIC_SERVER_DEV
const PROD_BASE_URL = process.env.NEXT_PUBLIC_SERVER_PROD
const BASE_URL = isLocal() ? DEV_BASE_URL : PROD_BASE_URL

console.log('BASE_URL', BASE_URL)
//! Config HTTP AXIOS REQUEST
class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL
    })
  }
}

const http = new Http().instance

export default http
