import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameToShow, setNameToShow ] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

      const addPerson = () =>  personService
      .create(nameObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationMessage(`Added person ${nameObj.name}`)
        setNewName('')
      })

      persons.includes(getName) ? handleReplace(nameObj, getName.id) : addPerson()
      console.log(persons)     
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
  const handleDelete = (person,id) => {
    console.log("BUTTON",person.name,id)
    if (window.confirm("Do you really want to delete?")) { 
      personService.delett(id,person).then(returnedPerson => {
        console.log("deleted object", person.name)
        setPersons(persons.filter(p => p.id !== id)) 
        setNotificationMessage(`Deleted person ${person.name}`)          
        setNewName('')
      }).catch(error => {
        setErrorMessage(`Information of ${person.name} has already been removed from server`)
      })
    }  
  }
  
  const handleReplace = (person,id) => {
    if (window.confirm(`Person ${newName} is already in your phonebook. Replace?`)) { 
      personService.update(id,person).then(returnedPerson => {
        setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
        setNotificationMessage(`Replaced person ${person.name}`,"")
        console.log("updated")
      })
    }
  }

  const Persons = () => {
    console.log("name to show", nameToShow)
    const newLis = persons.filter(person => person.name.search(new RegExp(nameToShow, "i")) > -1)
    
    return (
      newLis.length === 0 ? persons.map((person, i) => <div key={i}>{person.name} {person.number}</div>) 
      : newLis.map((person, i) => 
      <div key={i}>{person.name} {person.number} <button onClick={() => handleDelete(person,i+1)}>delete</button> </div>)
      )
  }

  useEffect(() => {
    console.log('effect')
     
      personService
      .getAll()
      .then(initialPersons => {
         setPersons(initialPersons)
      })  
  }, [])
    
  const Notification = ({message}) => {
    console.log("ISERROR", errorMessage)
    if (message === null) {
      return null
    }

    if(errorMessage !== null ){
      return <div className="error">
       {message}
      </div>
    }
  
    else return (
      <div className="notification">
        {message}
      </div>
    )
  }

  console.log('render', persons.length , 'persons') 
  console.log("checkerforpersons",persons)

  
  
  return (
    <div>
      <Filter/>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
      <Notification message={errorMessage}/>
      <PersonForm/>
      <h2>Numbers</h2>
  <div>
    <Persons/>
  </div>
    </div>
  )

}

export default App
//ReactDOM.render(<App />, document.getElementById('root'))
