import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameToShow, setNameToShow ] = useState('')

  const Filter = () => {
    const handleFilterChange = (event) => {
      console.log(event.target.value)
      setNameToShow(event.target.value)
    }

    return (
    <div> filter: 
    <input 
      value={nameToShow} 
      onChange={handleFilterChange}
    />
    </div>
    )
  }

  const PersonForm = () => {
    const addName = (event) => {
      event.preventDefault()
      console.log('button clicked', event.target)
  
      const nameObj = {
        name: newName, number: newNumber
      }
      const getName = persons.find(person => person.name === nameObj.name)
      console.log(getName)
  
      persons.includes(getName) ? window.alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(nameObj))
      console.log(persons)
      setNewName('')
    }
  
    const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
      console.log(event.target.value)
      setNewNumber(event.target.value)
    }

    return (
      <form onSubmit={addName}>
        <div> name: 
        <input 
        value={newName} 
        onChange={handleNameChange}
        />
        </div>
        <div> number: 
        <input 
        value={newNumber} 
        onChange={handleNumberChange}
        />
        </div>
        <div>  
        <button type="submit">add</button>
        </div>
        </form>
    )
  }

  const Persons = () => {
    console.log("name to show", nameToShow)
    
    const newLis = persons.filter(person => person.name.search(new RegExp(nameToShow, "i")) > -1)
    console.log("new filter func",persons.filter(person => person.name.search(new RegExp(nameToShow, "i")) > -1))
    console.log("filter", persons[0].name.search(/Arto/i))
    console.log("new lis len", newLis.length)
    console.log("persons",persons)
    
    return (
      newLis.length === 0 ? persons.map((person, i) => <div key={i}>{person.name} {person.number}</div>) : newLis.map((person, i) => <div key={i}>{person.name} {person.number}</div>)
      )
  }

  return (
    <div>
      <Filter/>
      <h2>Phonebook</h2>
      <PersonForm/>
      <h2>Numbers</h2>
  <div>
    <Persons/>
  </div>
    </div>
  )

}

export default App
ReactDOM.render(<App />, document.getElementById('root'))
