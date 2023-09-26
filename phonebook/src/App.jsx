import { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import PeopleList from './components/PeopleList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '55-5555-5555'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  /* const [filteredPeople, setFilteredPeople] = useState([]) */
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const alreadyThere = persons.some(person => person.name === newName)

    if (alreadyThere) {
      return alert(`${newName} is already in the phonebook`)
    }

    setPersons([...persons, { name: newName, number: newNumber }])
    /* setPersons(persons.concat({ name: newName})) */
    setNewName('')
    setNewNumber('')

  }

  const handleSearchPeople = (event) => {
    setFilter(event.target.value)
/*     const filteredList = persons.filter(person => {return person.name.toLowerCase().includes(filter.toLowerCase())})
    setFilteredPeople(filteredList) */
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

      <PeopleList list={peopleToShow} />
      
    </div>
  )
}

export default App
