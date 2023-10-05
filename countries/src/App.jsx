import { useEffect, useState } from 'react'
import axios from 'axios'
import countryService from './services/countryData'
import weatherService from './services/weatherData'
import CountryList from './components/CountryList'

function App() {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesAfterFilter, setCountriesAfterFilter] = useState([])
  const [weather, setWeather] = useState({})

  useEffect( () => {
      countryService
        .getAll()
        .then(receivedCountries => {
          const characterCountries = receivedCountries.map((country) => {
            return {
              name: country.name.common, 
              flag: country.flags.png, 
              languages: country.languages, 
              area: country.area,
              capital: country.capital,
              coordinates: country.capitalInfo.latlng
            }
          })
          setCountries(characterCountries)
        })
    }, [])

    useEffect( () => {
      if (countriesAfterFilter.length === 1) {
           weatherService
            .getWeather(countriesAfterFilter[0].coordinates[0], countriesAfterFilter[0].coordinates[1])
            .then(receivedWeather => {
              const neededData = {
                weather: receivedWeather.weather[0],
                temperature: receivedWeather.main.temp,
                wind: receivedWeather.wind.speed
              }
              setWeather(neededData)
            })
      }
    }, [value, countriesAfterFilter])

    useEffect(() => {
      const filteredCountries = countries.filter((country => country.name.toLowerCase().includes(value.toLowerCase())))
      setCountriesAfterFilter(filteredCountries)
    }, [value])

  const handleChange = (event) => {
    setValue(event.target.value)
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
            area: receivedCountry.area,
            capital: receivedCountry.capital,
            coordinates: receivedCountry.capitalInfo.latlng
          }]
          setCountriesAfterFilter(neededData)
        })
  }

  return (
    <div>
      <form>
        <p>find countries <input value={value} onChange={handleChange} type='text'/></p>
        <CountryList list={countriesAfterFilter} handleClick={handleCountryClick} currentWeather={weather} />
      </form>
    </div>
  )
}

export default App
