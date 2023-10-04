import { useEffect, useState } from 'react'
import axios from 'axios'
import countryService from './services/countryData'
import CountryList from './components/CountryList'

function App() {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [specificCountry, setSpecificCountry] = useState([])

  useEffect( () => {
    // if (value !== '') {
      countryService
        .getAll()
        .then(receivedCountries => {
          const characterCountries = receivedCountries.map((country) => {
            return {
              name: country.name.common, 
              flag: country.flags.png, 
              languages: country.languages, 
              area: country.area}
          })
/*           const filteredCountries = characterCountries.filter(country => country.name.toLowerCase().includes(value.toLowerCase()))
          setCountries(filteredCountries) */
          setCountries(characterCountries)
        })

    }, [])

  const filterOn = value !== ''

  const handleChange = (event) => {
    setValue(event.target.value)
    setSpecificCountry([])
  }

  const handleCountryClick = (event, country) => {
    event.preventDefault()
    countryService
      .getCountry(country)
        .then(receivedCountry => {
          const neededData = [{
            name: receivedCountry.name.common, 
            flag: receivedCountry.flags.png, 
            languages: receivedCountry.languages, 
            area: receivedCountry.area
          }]
          setSpecificCountry(neededData)
        })
  }

  const countriesToShow = filterOn
  ? countries.filter((country => country.name.toLowerCase().includes(value.toLowerCase())))
  : []

  const chosenCountry = specificCountry.length !== 0

  const listOrSingle = chosenCountry
  ? specificCountry
  : countriesToShow

  return (
    <div>
      <form>
        <p>find countries <input value={value} onChange={handleChange} type='text'/></p>
        <CountryList list={listOrSingle} handleClick={handleCountryClick} />
      </form>
    </div>
  )
}

export default App
