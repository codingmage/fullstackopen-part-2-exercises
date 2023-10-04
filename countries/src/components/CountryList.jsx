const CountryList = ({ list, handleClick }) => {
    const listSize = list.length

    console.log(list)

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
        console.log(country.languages)

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

            </div>

        )
    }
}

export default CountryList