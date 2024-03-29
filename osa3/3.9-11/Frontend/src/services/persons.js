import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const delett = (id, oldObject) => {
  const request = axios.delete(`${baseUrl}/${id}`, oldObject)
  console.log(`${baseUrl}/${id}`, oldObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, delett }