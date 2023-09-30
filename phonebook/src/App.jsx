import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import PeopleList from './components/PeopleList'
import axios from 'axios'
import personService from './services/people'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  /* const [filteredPeople, setFilteredPeople] = useState([]) */

  useEffect(() => {
    personService
      .getAll()
      .then(numbers => {
        setPersons(numbers)
      })
  }, [])
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const alreadyThere = persons.some(person => person.name === newName && person.number === newNumber)

    const samePersonNewNumber = persons.some(person => person.name === newName && person.number !== newNumber)

    if (alreadyThere) {
      return alert(`${newName} is already in the phonebook`)
    }

    if (samePersonNewNumber) {
      if (confirm(`${newName} is already in the phonebook. Replace the old number with the new one?`) == true) {
        const selectedPerson = persons.find(p => p.name == newName) 
        const changedPerson = {...selectedPerson, number: newNumber}

        const thisPersonId = selectedPerson.id

        personService
          .update(thisPersonId, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
            })
        return
      }
    }

    const personInfo = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personInfo)
      .then(returnedInfo => {
        setPersons([...persons, returnedInfo])
        setNewName('')
        setNewNumber('')
      })

/*     setPersons([...persons, { name: newName, number: newNumber }]) */
    /* setPersons(persons.concat({ name: newName})) */
/*     setNewName('')
    setNewNumber('') */

  }

  const handleSearchPeople = (event) => {
    setFilter(event.target.value)
/*     const filteredList = persons.filter(person => {return person.name.toLowerCase().includes(filter.toLowerCase())})
    setFilteredPeople(filteredList) */
  }

  const handleRemoveNumber = (id, name) => {
    if (confirm(`Delete ${name}?`) == true) {
      const personsWithoutDeleted = persons.filter(person => person.id !== id)

      personService
        .removeNumber(id)
         .then(setPersons(personsWithoutDeleted))
        .catch(error => {
          alert(
            `Unable to delete this person.`
          ) })
    }
    
  }

  const peopleToShow = (filter === '')
    ? persons
    : persons.filter(person => {return person.name.toLowerCase().includes(filter.toLowerCase())})

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filterValue={filter} handleSearch={handleSearchPeople} />

      <h2>Add a new</h2>

      <Form 
        nameValue={newName} 
        numberValue={newNumber} 
        handleName={handleNameChange} 
        handleNumber={handleNumberChange} 
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>

      <PeopleList list={peopleToShow} handleDeletion={handleRemoveNumber} />
      
    </div>
  )
}

export default App
