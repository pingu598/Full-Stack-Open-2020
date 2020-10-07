import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content, id) => {
    const object = {content, id:id, votes: 0}
    const response = await axios.post(baseUrl, object)
    return response.data
  }
const voteAnec = async (content, id, votes) => {
    const object = {content, id, votes: votes + 1 }
    const response = await axios.put(`${baseUrl}/${id}`, object)
     return response.data
}

export default { getAll, createNew, voteAnec }