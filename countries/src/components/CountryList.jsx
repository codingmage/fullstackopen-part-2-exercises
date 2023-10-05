import { useEffect } from "react"
import weatherService from '../services/weatherData'

const CountryList = ({ list, handleClick, currentWeather }) => {
    const listSize = list.length

    const hasWeather = currentWeather.weather !== undefined

    if (listSize === 0) {
        return null
    } else if (listSize > 10) {
        return (<span>Too many matches, specify another filter</span>)
    } else if (listSize <= 10 && listSize > 1) {
        return (
            <ul>
                {list.map(country => {
                    return (
                        <li key={country.name}>{country.name} <button onClick={(event) => handleClick(event, country.name)}>show</button> </li>)}
                    )
                }
            </ul>
        )
    } else {
        const country = list[0]

        const languageList = Object.values(country.languages)

        return (
            <div>
                <h1>{country.name}</h1>

                <p>capital {country.capital}</p>
                <p>area {country.area}</p>

                <h3>Languages</h3>
                <ul>
                    {
                        languageList.map(language => <li key={language}>{language}</li>)
                    }
                </ul>

                <img src={country.flag} alt={`${country.name}'s flag`} />

                <h3>Weather in {country.capital}</h3>

                <p>Temperature {currentWeather.temperature} Celsius</p>

                {hasWeather 
                    ? <img src={`https://openweathermap.org/img/wn/${currentWeather.weather.icon}@2x.png`} alt={currentWeather.weather.description}/> 
                    : null
                }

                <p>wind {currentWeather.wind} m/s</p>

            </div>

        )
    }
}

export default CountryList