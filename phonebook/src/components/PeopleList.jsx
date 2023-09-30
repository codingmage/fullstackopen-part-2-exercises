const PeopleList = ({list, handleDeletion}) => {

    return (
        <ul>
            {list.map(person => 
                <li key={person.name}>
                    {person.name} {person.number} <button onClick={() => handleDeletion(person.id, person.name)}>delete</button>
                </li>
            )}
        </ul>
    )
}

export default PeopleList