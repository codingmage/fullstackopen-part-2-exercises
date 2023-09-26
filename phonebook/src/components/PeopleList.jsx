const PeopleList = ({list}) => {
    return (
        <ul>
            {list.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
        </ul>
    )
}

export default PeopleList