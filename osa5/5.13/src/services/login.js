import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

//FOR TEST
/* "username": "mluukkai",
    "password": "salainen"*/


export default { login }